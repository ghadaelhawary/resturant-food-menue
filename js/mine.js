


let apiData = [];
let posts = [];

let cardContainer = document.getElementById('card-data');

let links = document.querySelectorAll('.navbar .nav-link')


for(let i=0 ; i<links.length ; i++){
    links[i].addEventListener('click' , function(e){
        // console.log(e.target.innerHTML)
        let urlLink= e.target.innerHTML;
        getApi(urlLink);
    })
}


function getApi(urlLink){
    var httpRwquest =  new XMLHttpRequest();
    httpRwquest.open('Get',`https://forkify-api.herokuapp.com/api/search?q=${urlLink}`);
    httpRwquest.send();

    httpRwquest.addEventListener('readystatechange', function(){
        if(httpRwquest.readyState == 4 && httpRwquest.status ==200)
        {
          apiData = JSON.parse(httpRwquest.response);
          posts = apiData.recipes;
          displayData();
          
        }
    })
}



function displayData(){
    var cardData = '';

    for(var i=0 ; i< posts.length ; i++)
    {
        cardData += `
        <div class="col-md-4">
           <div class="card" style="width: 18rem;">
              <img src="${posts[i].image_url}" class="card-img-top recieved-img" alt="...">
              <div class="card-body">
              <h5 class="card-title">${posts[i].title}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="${posts[i].source_url}" class="btn btn-primary" target="_blank">source </a>
          </div>
        </div>
      </div>`;
     
    
    }
    cardContainer.innerHTML = cardData;
    // console.log(cardContainer)
}

getApi("pizza");

