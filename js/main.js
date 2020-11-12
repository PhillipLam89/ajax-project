var xhr = new XMLHttpRequest();
var interval = null;
var count = 1;
var $cocktails = document.querySelector('.cocktails-text');
var data2 = null;
var $firstImg = document.querySelector('.first');
var drinkList = null;

function random(min, max) { // gives random number between min-max (inclusive)  min = 0 (starting index)  max = allCocktails.length-1
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  }, 2000);
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
    document.querySelector('#home-page').classList.add('hidden');
    document.querySelector('#random-ingredients').textContent = '';
    document.querySelector('#random-page').classList.remove('hidden');
    document.querySelector('#browse-page').classList.add('hidden');
    document.querySelector('.home-icon').classList.remove('hidden');
    document.querySelector('.browse').classList.remove('hidden');
    $recipeDiv.innerHTML = '';
    var idx = random(0, allCocktails.drinks.length - 1);
    document.querySelector('#random-name').innerHTML = '';
    document.querySelector('#top-header').textContent = 'Random Cocktail # ' + [idx + 1] + '-' + allCocktails.drinks[idx].strDrink;
    document.querySelector('#random-img-div').innerHTML = '';
    document.querySelector('#random-list').textContent = '';

    var $ingredients2 = document.createElement('h2');
    $ingredients2.textContent = 'Ingredients: ';
    document.querySelector('#random-ingredients').appendChild($ingredients2);

    var $imgRandom = document.createElement('img');
    $imgRandom.className = 'slideshow-img2';
    $imgRandom.setAttribute('src', allCocktails.drinks[idx].strDrinkThumb);
    document.querySelector('#random-img-div').appendChild($imgRandom);

    for (var value in allCocktails.drinks[idx]) {
      if (value.indexOf('strIngredient') > -1 && allCocktails.drinks[idx][value] !== null) {
        var $p3 = document.createElement('p');
        $p3.className = 'no-margin';
        $p3.textContent = allCocktails.drinks[idx][value];
        document.querySelector('#random-list').appendChild($p3);
      }
    }
    var $instructions2 = document.createElement('h2');
    $instructions2.className = 'instructions';
    $instructions2.textContent = 'Instructions: ';
    document.querySelector('#random-list').append($instructions2);
    for (var randomIns in allCocktails.drinks[idx]) {
      if (randomIns === 'strInstructions' && allCocktails.drinks[idx][randomIns] !== null) {
        var $p4 = document.createElement('p');
        $p4.className = 'no-margin';
        $p4.textContent = allCocktails.drinks[idx][randomIns];
        document.querySelector('#random-list').appendChild($p4);
      }
    }

  } else if (event.target.className === 'icons browse' || event.target.id === 'browse-icon') {
    $recipeDiv.innerHTML = '';
    document.querySelector('#top-header').textContent = 'Browse Cocktails';
    document.querySelector('#home-page').classList.add('hidden');
    document.querySelector('#random-page').classList.add('hidden');
    document.querySelector('#browse-page').classList.remove('hidden');
    document.querySelector('.home-icon').classList.remove('hidden');
    document.querySelector('.browse').classList.add('hidden');

  } else if (event.target.className === 'home-icon icons') {
    $recipeDiv.innerHTML = '';
    document.querySelector('#browse-page').classList.add('hidden');
    document.querySelector('#top-header').textContent = 'Famous Cocktails' + '  ' + ' Homepage';
    document.querySelector('#home-page').classList.remove('hidden');
    document.querySelector('.browse').classList.remove('hidden');
    document.querySelector('#random-page').classList.add('hidden');
    document.querySelector('.home-icon').classList.add('hidden');
  } else if (event.target.className === 'letters') {
    var $span = document.querySelectorAll('span');
    for (var i = 0; i < $span.length; i++) {
      $span[i].style = 'border: none'; // this allows the letter clicked to be underlined. Will clear all underlines first.

    }
    event.target.style = 'border-bottom: 3px solid black';

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + event.target.textContent);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      drinkList = xhr2.response;

      document.querySelector('.cocktails-letter').textContent = event.target.textContent;
      document.querySelector('.cocktails-letter').setAttribute('class', 'cocktails-letter');
      document.querySelector('.cocktails-letter').classList.add('sticky');

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
    document.querySelector('#home-page').classList.add('hidden');
    document.querySelector('#random-page').classList.add('hidden');
    document.querySelector('#browse-page').classList.add('hidden');
    document.querySelector('.browse').classList.remove('hidden');
    document.querySelector('#recipe-page').classList.remove('hidden');
    document.querySelector('#top-header').textContent = event.target.textContent;

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

    document.querySelector('#home-page').classList.add('hidden');
    document.querySelector('#random-page').classList.add('hidden');
    document.querySelector('#browse-page').classList.add('hidden');
    document.querySelector('.browse').classList.remove('hidden');
    document.querySelector('#recipe-page').classList.remove('hidden');
    document.querySelector('.home-icon').classList.remove('hidden');
    // sets header title to name of cocktail they clicked
    var $chosenCocktail = document.querySelector('.cocktails-text');
    document.querySelector('#top-header').textContent = $chosenCocktail.textContent;

    var $ingredients3 = document.createElement('h3');
    $ingredients3.textContent = 'Ingredients:';
    document.querySelector('#recipe-img-div').appendChild($ingredients3);
    var index = null;
    for (var m = 0; m < allCocktails.drinks.length; m++) {
      if (allCocktails.drinks[m].strDrink === $chosenCocktail.textContent) {
        index = m;
      }
    }
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
