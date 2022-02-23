let news = [];
let url = '';
let page = 1;
let totalPage = 0;
let menusButton = document.querySelectorAll(".menues button");
menusButton.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));
let searchButton = document.getElementById("search-button");

const getNews = async () => {
    try { 
        let header = new Headers({ 'x-api-key': 'MPhoSM0OA2cU_foMxrgKp9OeloSS2-7koCku0EDXaWA' });
        
        url.searchParams.set("page", page);
        
        let response = await fetch(url, { headers: header });
        let data = await response.json();
        console.log(data);
        totalPage = data.total_pages;
        page = data.page;



        if (response.status == 200) {
            if (data.total_hits == 0) {
                throw new Error("검색결과가 없습니다.");
            }
            news = data.articles;
            render()
            pageNation();
        } else throw new Error(error.message);
    } catch (error) {
        console.log("error : ", error.message);
        errorRender(error.message);
    }
}

const errorRender = (error) => {
    let errorHtml = `<div class="alert alert-dark text-center" role="alert">
  찾을 수 없습니다.
</div>`
    document.getElementById("news-bord").innerHTML = errorHtml;
}

const getLatestNews = async() => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    console.log(url);
    getNews(url);
}

const render = () => {
    let newsHtml = "";
    newsHtml = news.map((item) => {
        return `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${item.media}" alt="">
                </div>
                <div class="col-lg-8">
                    <h2>${item.title}</h2>
                    <p>
                        ${item.summary}
                    </p>
                    <div>
                        ${item.rights} ${item.published_date}
                    </div>
                </div>
            </div>`
    }).join('')

    document.getElementById("news-bord").innerHTML = newsHtml;
}
const getNewsByTopic = async (event) => {
    console.log(event.target.textContent);

    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?&countries=KR&page_size=10&topic=${topic}`);
    getNews(url);
}

const getNewsByKeyword = async () => {
    let keyword = document.getElementById("search-input").value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    getNews(url);
}

const pageNation = () => {
    let pageNationHtml = '';
    let pageGroup = Math.ceil(page / 5);
    let last = pageGroup * 5;
    if (last > totalPage) {
        last = totalPage;
    }
    let first = last - 4;

    pageNationHtml = `<li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`;

    for (let i = first; i <= last; i++){
        pageNationHtml += `<li class="page-item ${i == page ? "active" : ""}">
        <a class="page-link" href="#" onclick="moveTopage(${i})">${i}</a></li>`;
    }
    pageNationHtml += `<li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`;
    document.querySelector(".pagination").innerHTML = pageNationHtml;
}

const moveTopage = (pageNum) => {
    page = pageNum;
    window.scrollTo({ top: 0, behavior: "smooth" });
    getNews();
}
searchButton.addEventListener("click", getNewsByKeyword);

getLatestNews();