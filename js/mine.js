
let apiData = [];
let posts = [];
let cardContainer = document.getElementById('card-data');
let links = document.querySelectorAll('.navbar .nav-link');


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
        <div class="col-lg-4 col-md-6">
           <div class="card" style="width: 18rem;">
              <img src="${posts[i].image_url}" class="card-img-top recieved-img" alt="...">
              <div class="card-body">
              <h5 class="card-title">${posts[i].title}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="${posts[i].source_url}" class="btn btn-primary" target="_blank">source </a>
              <a href="#" class="btn btn-warning" target="_blank" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick='getRecipeDtails(${posts[i].recipe_id})'>details</a>
          </div>
        </div>
      </div>`;
     
    
    }
    cardContainer.innerHTML = cardData;
    // console.log(cardContainer)
}

getApi("pizza");


/*modal */

let recipeModalBody = document.getElementById('recipeBody');


async function getRecipeDtails(recipeId){
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    let responseData = await response.json();
    let recipeInfo = responseData.recipe;

    let madalInfo = `
    <img src="${recipeInfo.image_url}" class="card-img-top recieved-img" alt="...">
    <h3 class="mt-2"> title : <span class="text-info"> ${recipeInfo.title} <span> </h3>
    <h5 class="mt-2"> publicher : <span class="text-info"> ${recipeInfo.publisher} <span> </h5>
    `;
    recipeModalBody.innerHTML = madalInfo;
}

