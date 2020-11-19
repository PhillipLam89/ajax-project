
var interval = null;
var count = 1;
var $cocktails = document.querySelector('.cocktails-text');
var dataForPopularCocktails = null;
var $firstImg = document.querySelector('.first');
var drinkList = null;
var allCocktails = null;
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
var $refreshButton = document.querySelector('.refresh');
var $recipeDiv = document.querySelector('#recipe-img-div');

var $errorhandler = document.querySelector('.error-handler');
var $containerStatus = document.querySelector('.container');
var $errorMsg = document.querySelector('.error-msg');

function createElement(tagName, attributes, children) { // attribute is object, children is an array
  var $element = document.createElement(tagName);
  for (var name in attributes) {
    var value = attributes[name];
    $element.setAttribute(name, value);
  }
  for (var i = 0; i < children.length; i++) {
    $element.append(children[i]);
  }
  return $element;
}

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

  $recipeDiv.innerHTML = ''; // clears previous content every time user clicks
  var idx = random(0, allCocktails.drinks.length - 1); // this stores the index of the random cocktail to be used later to gather its info
  $randomName.innerHTML = '';
  $topHeader.textContent = 'Random Cocktail # ' + [idx + 1] + '-' + allCocktails.drinks[idx].strDrink;
  $randomImageDiv.innerHTML = '';
  $randomList.textContent = '';

  $randomIngredients.appendChild(createElement('h2', { class: '' }, ['Ingredients: ']));
  $randomImageDiv.appendChild(createElement('img', { src: allCocktails.drinks[idx].strDrinkThumb, class: 'slideshow-img2' }, ['']));

  for (var value in allCocktails.drinks[idx]) {
    if (value.indexOf('strIngredient') > -1 && allCocktails.drinks[idx][value] !== null) { // pulls data from all Ingredient properties that are NOT null
      $randomList.appendChild(createElement('p', { class: 'no-margin' }, [allCocktails.drinks[idx][value]]));
    }
  }
  $randomList.appendChild(createElement('h2', { class: 'instructions' }, ['Instructions: ']));
  for (var randomIns in allCocktails.drinks[idx]) {
    if (randomIns === 'strInstructions' && allCocktails.drinks[idx][randomIns] !== null) {
      $randomList.appendChild(createElement('p', { class: 'no-margin' }, [allCocktails.drinks[idx][randomIns]]));
    }
  }
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

  xhr4.addEventListener('error', function () {
    $errorhandler.classList.remove('hidden');
    $containerStatus.classList.add('hidden');
    $errorMsg.textContent = 'No Internet Connection Detected.';
  });
  xhr4.addEventListener('load', function () {
    if (xhr4.status !== 200) {
      $errorhandler.classList.remove('hidden');
      $containerStatus.classList.add('hidden');
      $errorMsg.textContent = 'No data available';
      return;
    }
    var data = xhr4.response;
    var $liquorInfoText = document.createElement('li');
    $liquorInfoText.className = 'liquor-info-text';
    $liquorInfoText.textContent = data.ingredients[0].strDescription;
    document.querySelector('.information-list').appendChild($liquorInfoText);
  });
  xhr4.send();
}

var popularCocktailsURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php';
var allCocktailsURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s';
function getJSON(target, headers, onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', target);
  xhr.responseType = 'json';
  for (var key in headers) {
    var value = headers[key];
    xhr.setRequestHeader(key, value);
  }
  xhr.addEventListener('error', function () {
    $errorhandler.classList.remove('hidden');
    $containerStatus.classList.add('hidden');
    $errorMsg.textContent = 'No Internet Connection Detected.';
  });
  xhr.addEventListener('load', function () {
    onLoad(xhr.response);
    if (xhr.status !== 200) {
      $errorhandler.classList.remove('hidden');
      $containerStatus.classList.add('hidden');
      $errorMsg.textContent = 'No data available, please try again';

    } else {
      $refreshButton.disabled = false;
      $errorhandler.classList.add('hidden');
      $containerStatus.classList.remove('hidden');
    }
  });
  xhr.send();
}
// displays popular cocktails
getJSON(popularCocktailsURL, null, function (data) {
  dataForPopularCocktails = data; // global storage of data
  interval = setInterval(function () {
    if (count === data.drinks.length) {
      count = 0;
    }
    $firstImg.setAttribute('src', data.drinks[count].strDrinkThumb);
    $cocktails.textContent = data.drinks[count].strDrink;
    $firstImg.className = 'slideshow-img';

    count++;
  }, 1800);
});

document.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-chevron-right right-arrow') { // clicking right arrow displays next image and resets interval timer
    clearInterval(interval);
    count++;
    if (count === dataForPopularCocktails.drinks.length) {
      count = 0;
    }
    $firstImg.setAttribute('src', dataForPopularCocktails.drinks[count].strDrinkThumb);
    $cocktails.textContent = dataForPopularCocktails.drinks[count].strDrink;

    interval = setInterval(function () {
      if (count === dataForPopularCocktails.drinks.length) {
        count = 0;
      }
      $firstImg.setAttribute('src', dataForPopularCocktails.drinks[count].strDrinkThumb);
      $cocktails.textContent = dataForPopularCocktails.drinks[count].strDrink;

      count++;
    }, 2000);
  } else if (event.target.className === 'fas fa-chevron-left left-arrow') { // clicking left arrow displays previous image and resets interval timer
    clearInterval(interval);
    count--;
    if (count < 0) {
      count = dataForPopularCocktails.drinks.length - 1;
    }
    $firstImg.setAttribute('src', dataForPopularCocktails.drinks[count].strDrinkThumb);
    $cocktails.textContent = dataForPopularCocktails.drinks[count].strDrink;

    interval = setInterval(function () {
      if (count === dataForPopularCocktails.drinks.length) {
        count = 0;
      }
      $firstImg.setAttribute('src', dataForPopularCocktails.drinks[count].strDrinkThumb);
      $cocktails.textContent = dataForPopularCocktails.drinks[count].strDrink;
      count++;
    }, 2000);
  } else if (event.target.className === 'random-button' || event.target.id === 'random-icon' || event.target.className === 'icon-text random-text') {
    getJSON(allCocktailsURL, null, function (allData) {
      allCocktails = allData;
      showRandomPage();
    });
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

    getJSON('https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=' + event.target.textContent, null, function (data) {
      drinkList = data;
      $cocktailsLetter.textContent = event.target.textContent;
      $cocktailsLetter.setAttribute('class', 'cocktails-letter');
      $cocktailsLetter.classList.add('sticky');

      var $recipeList = document.querySelector('#recipe-list');
      var $ol = document.createElement('ol');
      $recipeList.innerHTML = '';
      $recipeList.appendChild($ol);

      if (data.drinks === null) {
        data.drinks = [''];
        document.querySelector('.sticky').classList.add('hidden');
        $ol.appendChild(createElement('li', { class: 'no-recipes' }, ['SORRY but there are no recipes beginning with ' + event.target.textContent]));
      }
      for (var j = 0; j < drinkList.drinks.length; j++) {
        var $li2 = document.createElement('li');
        $li2.textContent = data.drinks[j].strDrink;
        $li2.setAttribute('class', 'recipe-link');
        $ol.appendChild($li2);
      }
    });
  } else if (event.target.className === 'recipe-link') {

    showRecipePage();

    $topHeader.textContent = event.target.textContent;
    var $ingredients = document.createElement('h2');
    $ingredients.textContent = 'Ingredients: ';
    for (var k = 0; k < drinkList.drinks.length; k++) {
      if (drinkList.drinks[k].strDrink === event.target.textContent) {
        $recipeDiv.appendChild(createElement('img', { src: drinkList.drinks[k].strDrinkThumb, class: 'slideshow-img2' }, [''])); // creates and append image
        $recipeDiv.appendChild($ingredients);

        for (var val in drinkList.drinks[k]) {
          if (val.indexOf('strIngredient') > -1 && drinkList.drinks[k][val] !== null) { // returns all ingredients required, leaves out empty ones
            $recipeDiv.appendChild(createElement('p', { class: 'no-margin' }, [drinkList.drinks[k][val]]));
          }
        }
        $recipeDiv.append(createElement('h2', { class: 'instructions' }, ['Instructions: ']));
        for (var ins in drinkList.drinks[k]) {
          if (ins === 'strInstructions' && drinkList.drinks[k][ins] !== null) {
            $recipeDiv.append(createElement('p', { class: 'no-margin' }, [drinkList.drinks[k][ins]]));
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
    for (var m = 0; m < dataForPopularCocktails.drinks.length; m++) {
      if (dataForPopularCocktails.drinks[m].strDrink === $chosenCocktail.textContent) {
        index = m;
      }
    }

    $recipeImgDiv.appendChild(createElement('img', { src: dataForPopularCocktails.drinks[index].strDrinkThumb, class: 'slideshow-img2' }, ['']));
    $recipeImgDiv.appendChild(createElement('h3', { class: '' }, ['Ingredients:']));

    for (var val2 in dataForPopularCocktails.drinks[index]) {
      if (val2.indexOf('strIngredient') > -1 && dataForPopularCocktails.drinks[index][val2] !== null) {
        $recipeImgDiv.append(createElement('p', { class: 'no-margin' }, [dataForPopularCocktails.drinks[index][val2]]));
      }
    }

    $recipeDiv.append(createElement('h2', { class: 'instructions' }, ['Instructions: ']));
    for (var val3 in dataForPopularCocktails.drinks[index]) {
      if (val3 === 'strInstructions' && dataForPopularCocktails.drinks[index][val3] !== null) {
        $recipeDiv.append(createElement('p', { class: 'no-margin' }, [dataForPopularCocktails.drinks[index][val3]]));
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
  } else if (event.target.className === 'refresh') {
    $errorhandler.classList.add('hidden');
    $containerStatus.classList.remove('hidden');
    $errorMsg.textContent = 'refreshing...';
    $refreshButton.disabled = true;
    getJSON(popularCocktailsURL, null, function (data) {
      dataForPopularCocktails = data;
    });
  }
});
