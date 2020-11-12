var xhr = new XMLHttpRequest();
var interval = null;
var count = 1;
var $cocktails = document.querySelector('.cocktails-text');
var data2 = null;
var $firstImg = document.querySelector('.first');
var drinkList = null;
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
    document.querySelector('#random-page').classList.remove('hidden');
    document.querySelector('#browse-page').classList.add('hidden');
    document.querySelector('.browse').classList.add('hidden');
  } else if (event.target.className === 'icons browse' || event.target.id === 'browse-icon') {
    document.querySelector('#home-page').classList.add('hidden');
    document.querySelector('#random-page').classList.add('hidden');
    document.querySelector('#browse-page').classList.remove('hidden');
    document.querySelector('.browse').classList.add('hidden');
    $recipeDiv.innerHTML = '';
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
        $li.textContent = drinkList.drinks[j].strDrink;
        $li.setAttribute('class', 'recipe-link');
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

    for (var k = 0; k < drinkList.drinks.length; k++) {
      if (drinkList.drinks[k].strDrink === event.target.textContent) {
        $img.setAttribute('src', drinkList.drinks[k].strDrinkThumb);
        $img.className = 'slideshow-img';
        $recipeDiv.appendChild($img);
      }
    }
  }
});

// var xhr3 = new XMLHttpRequest();

// xhr3.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?c=Cocktail');
// xhr3.responseType = 'json';

// xhr3.addEventListener('load', function () {

//   var randomData = xhr3.response;

// })
// xhr3.send();
