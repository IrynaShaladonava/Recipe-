let currentRecipe;

async function fetchRandomRecipe() {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.meals[0];
}

async function loadRecipe() {
    const recipe = await fetchRandomRecipe();
    const recipeSection = document.getElementById("recipeSection");
    const recipeTitleElement = document.getElementById("recipeTitle");

    currentRecipe = recipe;

    // чтобы остался оранжевый фон из css
    const currentBackground = getComputedStyle(recipeSection).background;

    // чтобы менялась картинка рецепта + задаю ей стиль
    recipeSection.style.background = `url(${recipe.strMealThumb}) center/cover no-repeat, ${currentBackground}`;
    // recipeSection.style.width ='650px';
    recipeSection.style.height='500px';
    recipeSection.style.borderRadius='20px';
    recipeSection.style.marginLeft='10px';

    recipeTitleElement.textContent = recipe.strMeal;
}

function showIngredients() {
    const ingredientListContainer = document.getElementById("ingredientList");
    const ingredientCountContainer = document.getElementById("ingredientCount");

    ingredientListContainer.innerHTML = "";
    ingredientCountContainer.textContent = "";
    ingredientCountContainer.style.marginTop='200px';
    

    if (currentRecipe) {
      
        let ingredientCount = 0;

        for (let i = 1; i <= 20; i++) {
            const ingredient = currentRecipe[`strIngredient${i}`];
            const measure = currentRecipe[`strMeasure${i}`];
            if (ingredient && measure) {
                const listItem = document.createElement("li");
                const icon = document.createElement("img");
                icon.src = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
                icon.alt = ingredient;
                icon.style.height='30px';
                icon.style.paddingRight = '10px';
                icon.classList.add("ingredient-icon");
                listItem.appendChild(icon);

                // Добавляем текст ингредиента
                listItem.innerHTML += ` ${measure} ${ingredient}`;
                listItem.classList.add("active"); // Добавляем класс active
                ingredientListContainer.appendChild(listItem);

                // Увеличиваем общее количество ингредиентов
                ingredientCount++;
            }
        }

        // Отображаем общее количество ингредиентов
        ingredientCountContainer.textContent = `${ingredientCount} items`;
        ingredientCountContainer.style.color = '#752A00';
        ingredientCountContainer.style.marginLeft='20px';
        ingredientCountContainer.style.paddingBottom='10px';
        ingredientCountContainer.style.fontSize='25px';
        ingredientCountContainer.style.fontFamily='Poppins';


    }
}

async function getIngredientImage(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/images/ingredients/${ingredient}`);
        const data = await response.json();

        // Проверяем, есть ли изображение ингредиента в ответе
        if (data.ingredients && data.ingredients.length > 0) {
            return data.ingredients[0].strIngredientThumb;
        }
    } catch (error) {
        console.error("Error fetching ingredient image:", error);
    }

    // Возвращаем пустую строку в случае ошибки или отсутствия изображения
    return "";
}






// ПРОБУЮ ДЛЯ СЕБЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function showDetails() {
    const detailsContainer = document.getElementById("detailsContainer");

    // Clear previous details
    detailsContainer.innerHTML = "";

    if (currentRecipe) {
        // Add logic to show details
        const detailsText = `Category: ${currentRecipe.strCategory}<br>Area: ${currentRecipe.strArea}<br>Instructions: ${currentRecipe.strInstructions}`;
        detailsContainer.innerHTML = detailsText;
        detailsContainer.style.fontFamily='Poppins';
        detailsContainer.style.fontSize='10px';
        detailsContainer.style.marginTop='100px';
        detailsContainer.style.marginLeft='20px';
        
    }
}
// Функция для отображения видео
async function showVideo() {
    const container = document.getElementById("videoContainer");

    // Очищаем контейнер
    container.innerHTML = "";

    if (currentRecipe) {
        const videoURL = currentRecipe.strYoutube;

        if (videoURL) {
            // Создаем тег iframe для вставки видео
            const iframe = document.createElement("iframe");
            iframe.src = videoURL;
            iframe.width = "560";
            iframe.height = "315";
            iframe.allowFullscreen = true; // Разрешаем полноэкранный режим

            // Вставляем iframe в контейнер
            container.appendChild(iframe);
        } else {
            // Если у рецепта нет видео, выводим сообщение
            container.textContent = "Video not available for this recipe.";
        }
    }
}
