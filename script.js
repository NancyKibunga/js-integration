
const apiKey= "4c8f012733e94d9f98b9419ae845a1f7";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
//fetches random data so that it doesnt show the user a blank page
// CREATING A URL FOR FETCHING RANDOM DATA ; backtick`` since the url is dynamic, limits the data to be fetched to 10
        // apikey parameter
        //await - the function contains a l;ot of data and can have some delays while fetching
         // convert or response to json format
 async function fetchRandomNews(){
    try{
        const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching news", error)
        //returns an empty array
        return[];
    }
}

searchButton.addEventListener("click", async () => {
     const query = searchField.value.trim () 
if(query !== ""){
    try{
        const articles = await fetchNewsQuery(query)
        displayBlogs(articles)

    } catch(error){
        console.error("Error fetching news by query", error)
    }
}})

async function fetchNewsQuery(query){
    try{
        const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching news", error)
        //returns an empty array
        return[];
    }

}
// creating display blocks function to display data articles
// empty initial html content; uisng for each coz we are creating one by one
// creating the elements one by one - div, img, title, description
// adding the classname using js
// an image property that gets the image from the article url and converts it to image, and uses the source image title as the alt
function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage ;
    img.alt = article.title;
    const title  = document.createElement("h2")
    const truncatedTitle = article.title.length > 15
    ? article.title.slice(0,15) + "..." : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDesc = article.description.length > 120
    ? article.description.slice(0,120) + "..." : article.description;
    description.textContent = truncatedDesc;
   

// appending the elements to the div created i.e blogcard
    // appending our blogcard into our main i.e  blog container
    blogCard.appendChild(img)
    blogCard.appendChild(title)
    blogCard.appendChild(description)
    // on click listener to open selected article in a new window.
    blogCard.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard)
    });

}

// initializing the function to fetch data
(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news", error);
    
    }
})();
