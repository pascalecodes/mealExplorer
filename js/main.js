//The user click to get a meal name photo, and instructions and place them in the DOM
//click a button to fire the function
document.getElementById('clickMeal').addEventListener('click', getMeal)
const mealArea= document.getElementById('meal')

//make a function call with a variable
function getMeal(){
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.meals[0])
      createMeal(data.meals[0])
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


const createMeal = (meal) => {
  const ingredients = [];
  for(let i=1; i<=20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      break;
    }
  }
  
  //add the image, name and ingredients + instructions for meal + video with cc and full screen option
  const newInnerHTML = `
    <div class="mealSection"
      <div class="columns">
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="Meal Image">
        ${meal.strYoutube ?`
        <div class="columns">
        <h3>Video Instructions</h3>
        <div class="videoSection">
        <iframe allowfullscreen="" frameborder="0" width="560" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}?&cc_lang_pref=fr&cc_load_policy=1"></iframe>
        </div>
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h3>Ingredients:</h3>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
      <div class="columns">
        <h3>Cooking Instructions: <u>${meal.strMeal}</u></h3>
        <p>${meal.strInstructions}</p>
      </div>
    </div> `: ''}`;
  
  mealArea.innerHTML = newInnerHTML;
}












