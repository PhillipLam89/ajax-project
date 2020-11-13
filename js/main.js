var xhr = new XMLHttpRequest();
var interval = null;
var count = 1;
var $cocktails = document.querySelector('.cocktails-text');
var data2 = null;
var $firstImg = document.querySelector('.first');
var drinkList = null;

var $homepage = document.querySelector('#home-page');
var $randomIngredients = document.querySelector('#random-ingredients');
var $randomPage = document.querySelector('#random-page');
var $browsePage = document.querySelector('#browse-page');
var $homeIcon = document.querySelector('.home-icon');
var $topHeader = document.querySelector('#top-header');
var $randomImageDiv = document.querySelector('#random-img-div');
var $randomList = document.querySelector('#random-list');
var $cocktailsLetter = document.querySelector('.cocktails-letter');
var $recipePage = document.querySelector('#recipe-page');
var $recipeImgDiv = document.querySelector('#recipe-img-div');
var $randomName = document.querySelector('#random-name');
var $infoPage = document.querySelector('#info-page');
var $dataPage = document.querySelector('#data-page');

function random(min, max) { // gives random number between min-max (inclusive)  min = 0 (starting index)  max = allCocktails.length-1
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showRandomPage() {
  $homepage.classList.add('hidden');
  $randomIngredients.textContent = '';
  $randomPage.classList.remove('hidden');
  $browsePage.classList.add('hidden');
  $homeIcon.classList.remove('hidden');
  $infoPage.classList.add('hidden');
  $dataPage.classList.add('hidden');
}

function showBrowsePage() {
  $recipeDiv.innerHTML = '';
  $topHeader.textContent = 'Browse Cocktails';
  $homepage.classList.add('hidden');
  $randomPage.classList.add('hidden');
  $browsePage.classList.remove('hidden');
  $homeIcon.classList.remove('hidden');
  $infoPage.classList.add('hidden');
  $dataPage.classList.add('hidden');
}

function showHomePage() {
  $recipeDiv.innerHTML = '';
  $browsePage.classList.add('hidden');
  $topHeader.textContent = 'Famous Cocktails' + '  ' + ' Homepage';
  $homepage.classList.remove('hidden');
  $randomPage.classList.add('hidden');
  $homeIcon.classList.add('hidden');
  $infoPage.classList.add('hidden');
  $dataPage.classList.add('hidden');
}

function showRecipePage() {
  $homepage.classList.add('hidden');
  $randomPage.classList.add('hidden');
  $browsePage.classList.add('hidden');
  $recipePage.classList.remove('hidden');
  $infoPage.classList.add('hidden');
  $dataPage.classList.add('hidden');
}

function showChosenRecipePage() {
  $homepage.classList.add('hidden');
  $randomPage.classList.add('hidden');
  $browsePage.classList.add('hidden');
  $recipePage.classList.remove('hidden');
  $homeIcon.classList.remove('hidden');
  $infoPage.classList.add('hidden');
  $dataPage.classList.add('hidden');
}

function showInfoPage(event) {
  $topHeader.textContent = event.target.textContent + ' Information';
  $infoPage.classList.add('hidden');
  $dataPage.classList.remove('hidden');

  var xhr4 = new XMLHttpRequest();
  xhr4.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?i=' + event.target.textContent);
  xhr4.responseType = 'json';
  xhr4.addEventListener('load', function () {
    var data = xhr4.response;
    var $liquorInfoText = document.createElement('li');
    $liquorInfoText.className = 'liquor-info-text';
    $liquorInfoText.textContent = data.ingredients[0].strDescription;
    document.querySelector('.information-list').appendChild($liquorInfoText);

  });
  xhr4.send();
}

xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  var data = xhr.response;
  data2 = data;
  interval = setInterval(function () {
    if (count === xhr.response.drinks.length) {
      count = 0;
    }
    $firstImg.setAttribute('src', data.drinks[count].strDrinkThumb);
    $cocktails.textContent = data.drinks[count].strDrink;
    $firstImg.className = 'slideshow-img';

    count++;
  }, 4800);
});

var $recipeDiv = document.querySelector('#recipe-img-div');

xhr.send();
document.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-chevron-right right-arrow') {
    clearInterval(interval);
    count++;
    if (count === xhr.response.drinks.length) {
      count = 0;
    }
    $firstImg.setAttribute('src', data2.drinks[count].strDrinkThumb);
    $cocktails.textContent = data2.drinks[count].strDrink;

    interval = setInterval(function () {
      if (count === xhr.response.drinks.length) {
        count = 0;
      }
      $firstImg.setAttribute('src', data2.drinks[count].strDrinkThumb);
      $cocktails.textContent = data2.drinks[count].strDrink;

      count++;
    }, 2000);
  } else if (event.target.className === 'fas fa-chevron-left left-arrow') {
    clearInterval(interval);
    count--;
    if (count < 0) {
      count = xhr.response.drinks.length - 1;
    }
    $firstImg.setAttribute('src', data2.drinks[count].strDrinkThumb);
    $cocktails.textContent = data2.drinks[count].strDrink;

    interval = setInterval(function () {
      if (count === xhr.response.drinks.length) {
        count = 0;
      }
      $firstImg.setAttribute('src', data2.drinks[count].strDrinkThumb);
      $cocktails.textContent = data2.drinks[count].strDrink;
      count++;
    }, 2000);
  } else if (event.target.className === 'random-button' || event.target.id === 'random-icon' || event.target.className === 'icon-text random-text') {
    showRandomPage();

    $recipeDiv.innerHTML = '';
    var idx = random(0, allCocktails.drinks.length - 1);
    $randomName.innerHTML = '';
    $topHeader.textContent = 'Random Cocktail # ' + [idx + 1] + '-' + allCocktails.drinks[idx].strDrink;
    $randomImageDiv.innerHTML = '';
    $randomList.textContent = '';

    var $ingredients2 = document.createElement('h2');
    $ingredients2.textContent = 'Ingredients: ';
    $randomIngredients.appendChild($ingredients2);

    var $imgRandom = document.createElement('img');
    $imgRandom.className = 'slideshow-img2';
    $imgRandom.setAttribute('src', allCocktails.drinks[idx].strDrinkThumb);
    $randomImageDiv.appendChild($imgRandom);

    for (var value in allCocktails.drinks[idx]) {
      if (value.indexOf('strIngredient') > -1 && allCocktails.drinks[idx][value] !== null) {
        var $p3 = document.createElement('p');
        $p3.className = 'no-margin';
        $p3.textContent = allCocktails.drinks[idx][value];
        $randomList.appendChild($p3);
      }
    }
    var $instructions2 = document.createElement('h2');
    $instructions2.className = 'instructions';
    $instructions2.textContent = 'Instructions: ';
    $randomList.append($instructions2);
    for (var randomIns in allCocktails.drinks[idx]) {
      if (randomIns === 'strInstructions' && allCocktails.drinks[idx][randomIns] !== null) {
        var $p4 = document.createElement('p');
        $p4.className = 'no-margin';
        $p4.textContent = allCocktails.drinks[idx][randomIns];
        $randomList.appendChild($p4);
      }
    }

  } else if (event.target.className === 'icons browse' || event.target.id === 'browse-icon') {
    showBrowsePage();

  } else if (event.target.className === 'home-icon icons') {
    showHomePage();
  } else if (event.target.className === 'letters') {
    var $span = document.querySelectorAll('span');
    for (var i = 0; i < $span.length; i++) {
      $span[i].style = 'border: none'; // this allows the letter clicked to be underlined. Will clear all underlines first.

    }
    event.target.style = 'border-bottom: 3px solid black';

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=' + event.target.textContent);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      drinkList = xhr2.response;

      $cocktailsLetter.textContent = event.target.textContent;
      $cocktailsLetter.setAttribute('class', 'cocktails-letter');
      $cocktailsLetter.classList.add('sticky');

      var $recipeList = document.querySelector('#recipe-list');
      var $ol = document.createElement('ol');
      $recipeList.innerHTML = '';
      $recipeList.appendChild($ol);

      if (drinkList.drinks === null) {
        drinkList.drinks = [''];
        var $li = document.createElement('li');
        $li.setAttribute('class', 'no-recipes');
        $li.textContent = 'SORRY but there are no recipes beginning with ' + event.target.textContent;
        document.querySelector('.sticky').classList.add('hidden');
        $ol.appendChild($li);
      }

      for (var j = 0; j < drinkList.drinks.length; j++) {
        var $li2 = document.createElement('li');
        $li2.textContent = drinkList.drinks[j].strDrink;
        $li2.setAttribute('class', 'recipe-link');
        $ol.appendChild($li2);
      }
    });

    xhr2.send();
  } else if (event.target.className === 'recipe-link') {

    showRecipePage();

    $topHeader.textContent = event.target.textContent;
    var $img = document.createElement('img');
    var $ingredients = document.createElement('h2');

    $ingredients.textContent = 'Ingredients: ';
    for (var k = 0; k < drinkList.drinks.length; k++) {
      if (drinkList.drinks[k].strDrink === event.target.textContent) {
        $img.setAttribute('src', drinkList.drinks[k].strDrinkThumb);
        $img.className = 'slideshow-img2';
        $recipeDiv.appendChild($img);
        $recipeDiv.appendChild($ingredients);
        for (var val in drinkList.drinks[k]) {
          if (val.indexOf('strIngredient') > -1 && drinkList.drinks[k][val] !== null) { // returns all ingredients required, leaves out empty ones
            var $p = document.createElement('p');
            $p.className = 'no-margin';
            $p.textContent = drinkList.drinks[k][val];
            $recipeDiv.appendChild($p);
          }
        }
        var $instructions = document.createElement('h2');
        $instructions.className = 'instructions';
        $instructions.textContent = 'Instructions: ';
        $recipeDiv.append($instructions);
        for (var ins in drinkList.drinks[k]) {
          if (ins === 'strInstructions' && drinkList.drinks[k][ins] !== null) {
            var $p2 = document.createElement('p');
            $p2.className = 'no-margin';
            $p2.textContent = drinkList.drinks[k][ins];
            $instructions.appendChild($p2);
          }
        }
      }
    }
  } else if (event.target.className === 'slideshow-img' || event.target.className === 'slideshow-img first' || event.target.className === 'cocktails-text') {
    showChosenRecipePage();
    // sets header title to name of cocktail they clicked
    var $chosenCocktail = document.querySelector('.cocktails-text');
    $topHeader.textContent = $chosenCocktail.textContent;

    var index = null;
    for (var m = 0; m < allCocktails.drinks.length; m++) {
      if (allCocktails.drinks[m].strDrink === $chosenCocktail.textContent) {
        index = m;
      }
    }
    var $chosenImage = document.createElement('img');
    $chosenImage.className = 'slideshow-img2';
    $chosenImage.setAttribute('src', allCocktails.drinks[index].strDrinkThumb);
    $recipeImgDiv.appendChild($chosenImage);

    var $ingredients3 = document.createElement('h3');
    $ingredients3.textContent = 'Ingredients:';
    $recipeImgDiv.appendChild($ingredients3);

    for (var val2 in allCocktails.drinks[index]) {
      if (val2.indexOf('strIngredient') > -1 && allCocktails.drinks[index][val2] !== null) {
        var $p5 = document.createElement('p');
        $p5.className = 'no-margin';
        $p5.textContent = allCocktails.drinks[index][val2];
        $ingredients3.appendChild($p5);
      }
    }
    var $instructions3 = document.createElement('h2');
    $instructions3.className = 'instructions';
    $instructions3.textContent = 'Instructions: ';
    $ingredients3.append($instructions3);

    for (var val3 in allCocktails.drinks[index]) {
      if (val3 === 'strInstructions' && allCocktails.drinks[index][val3] !== null) {
        var $p6 = document.createElement('p');
        $p6.className = 'no-margin';
        $p6.textContent = allCocktails.drinks[index][val3];
        $instructions3.appendChild($p6);
      }
    }
  } else if (event.target.id === 'info-icon' || event.target.id === 'info-img') {
    $dataPage.classList.add('hidden');
    $recipeDiv.innerHTML = '';
    $topHeader.textContent = 'Liquor List';
    $homepage.classList.add('hidden');
    $randomPage.classList.add('hidden');
    $infoPage.classList.remove('hidden');
    $browsePage.classList.add('hidden');
    $recipePage.classList.add('hidden');
    document.querySelector('.information-list').textContent = '';
  } else if (event.target.className === 'liquors') {
    showInfoPage(event);
  }
});

var allCocktails = null;
var xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s');
xhr3.responseType = 'json';

xhr3.addEventListener('load', function () {
  var randomData = xhr3.response;
  allCocktails = randomData;
});
xhr3.send();
