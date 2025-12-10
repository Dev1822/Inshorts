const news=document.querySelector(".news");
const left=document.querySelector(".left");
const sidebar=document.querySelector(".sidebar"); 
const hamburger=document.querySelector(".hamburger");
const menu=document.querySelector(".menu");
const categories=document.querySelectorAll(".category");
const loading=document.querySelector(".loading");
console.log(categories[0].textContent);

let topic="everything";
let sidebarStatus="closed";

function loadNews(data){
    let articles=data.articles;
    let contents="";
    for(let i=0;i<10;i++){
        let img=articles[i].urlToImage;
        let title=articles[i].title;
        let author=articles[i].author;
        let description=articles[i].description;
        let link=articles[i].url;
        let date=articles[i].publishedAt.split("T");
        let time=date[1].split(":");
        let content=
`
<div class="card">
    <img src="${img}" alt="image" class="img">
    <div class="content">
        <div class="title">${title}</div>
        <div class="author"><b style="color:black">short</b> by ${author} / ${time[0]}:${time[1]} on ${date[0]}</div>
        <br>
        <div class="description">${description}</div>
        <br><br>
        <a href="${link}" class="link">READ MORE</a>
    </div>
</div>
`
        contents+=content;
    }
    news.innerHTML=contents;
}

function loadAPI(topic){
    loading.style.display = "block";
    news.innerHTML = "";
    fetch(`https://newsapi.org/v2/everything?q=${topic}&from=2025-11-10&sortBy=publishedAt&apiKey=8ad09050acbc48de9822fc6e4753861a`)
    .then((response)=>response.json())
    .then((data)=>{
        loading.style.display = "none";
        loadNews(data)})
    .catch((error)=>{console.log(error)});
}

loadAPI(topic);

left.addEventListener("click",()=>{
    if(sidebarStatus=="closed"){
        sidebar.style.display="block";
        menu.textContent="Close";
        hamburger.setAttribute("src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE1IDE1Ij48cGF0aCBmaWxsPSIjMWQzMjJkIiBkPSJNMTIuMjI1IDIuMDgyYS41LjUgMCAwIDEgLjY5My42OTRsLS4wNjQuMDc4TDguMjA3IDcuNWw0LjY0NyA0LjY0N2wuMDY0LjA3OGEuNS41IDAgMCAxLS42OTMuNjkzbC0uMDc4LS4wNjRMNy41IDguMjA3bC00LjY0NiA0LjY0N2EuNS41IDAgMSAxLS43MDctLjcwN0w2Ljc5MyA3LjVMMi4xNDcgMi44NTRsLS4wNjUtLjA3OGEuNS41IDAgMCAxIC42OTQtLjY5NGwuMDc4LjA2NUw3LjUgNi43OTNsNC42NDctNC42NDZ6Ii8+PC9zdmc+");
        sidebarStatus="open";
    }
    else{
        sidebar.style.display="none";
        menu.textContent="Menu"
        hamburger.setAttribute("src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjMWQzMjJkIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDMuNzVBLjc1Ljc1IDAgMCAxIC43NSAzaDE0LjVhLjc1Ljc1IDAgMCAxIDAgMS41SC43NUEuNzUuNzUgMCAwIDEgMCAzLjc1TTAgOGEuNzUuNzUgMCAwIDEgLjc1LS43NWgxNC41YS43NS43NSAwIDAgMSAwIDEuNUguNzVBLjc1Ljc1IDAgMCAxIDAgOG0uNzUgMy41YS43NS43NSAwIDAgMCAwIDEuNWgxNC41YS43NS43NSAwIDAgMCAwLTEuNXoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==");
        sidebarStatus="closed";
    }
})

categories.forEach(category => {
    category.addEventListener("click",()=>{
        topic=category.textContent;
        loadAPI(topic);
    })
});