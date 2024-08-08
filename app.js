const seachBox=document.querySelector('.searchBox');
const seachBtn=document.querySelector('.searchBtn');
const recipeCont=document.querySelector('.recipe-cont');
const closeBtn=document.querySelector('.btn-close');
const recipeDetails=document.querySelector('.recipe-details-cont');



//function to get recipe
const fetchAPI =async (val)=>{
    recipeCont.innerHTML=`<h2>Fetching recipes.....</h2>`;
    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    const response=await data.json();
    
    recipeCont.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h2>${meal.strMeal}</h2>
        <p><span>${meal.strArea}</span> Dish</p>
        <p><span>${meal.strCategory}<span></p>
        
        `
        const btn = document.createElement('button')
        btn.innerText="View Recipe"
        recipeDiv.appendChild(btn);

        btn.addEventListener('click',()=>{
            openRecipePopup(meal);
        })
        recipeCont.appendChild(recipeDiv);
    });
}

const fetchIndrident= (meal) =>{
    let ingridientList = "";
    for(let i=1; i<=20; i++){
        const ingridient= meal[`strIngredient${i}`];
        if(ingridient){
            const measure = meal[`strMeasure${i}`]
            ingridientList += `<li>${ingridient} - ${measure}</li>`
        }
        else{
            break;
        }
    }
    return ingridientList;
}
const openRecipePopup = (meal)=>{
    recipeDetails.innerHTML= `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingridents:</h3>
    <ul class="ingredientList">${fetchIndrident(meal)}</ul>
    <div class="instructions">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
        
    </div>
    `
    
    recipeDetails.parentElement.style.display = "block"
}
closeBtn.addEventListener('click',()=>{
    recipeDetails.parentElement.style.display = "none"
})
seachBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const val=seachBox.value.trim();
    // console.log(val);
    fetchAPI(val)
})
