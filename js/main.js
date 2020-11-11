var xhr = new XMLHttpRequest();
var $h2 = document.querySelector('h2');
var interval = null;
var count = 1;
var $cocktails = document.querySelector('.cocktails-text');
var data2 = null;
xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  var data = xhr.response;
  data2 = data;
  interval = setInterval(function () {
    if (count === xhr.response.drinks.length) {
      count = 0;
    }
    document.querySelector('.first').classList.add('hidden');
    var img = document.createElement('img');
    img.setAttribute('src', data.drinks[count].strDrinkThumb);
    $cocktails.textContent = data.drinks[count].strDrink;
    img.className = 'slideshow-img';
    count++;

    $h2.appendChild(img);

    setTimeout(function () {
      $h2.removeChild(img);
    }, 1000);

  }, 1000);
});
xhr.send();

document.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-chevron-right right-arrow') {
    count++;
    $cocktails.textContent = '';
    clearInterval(interval);

    var img = document.createElement('img');
    img.setAttribute('src', data2.drinks[count].strDrinkThumb);
    $cocktails.textContent = data2.drinks[count].strDrink;

    count++;
    interval = setInterval(function () {
      if (count === xhr.response.drinks.length) {
        count = 0;
      }
      document.querySelector('.first').classList.add('hidden');
      var img = document.createElement('img');
      img.setAttribute('src', data2.drinks[count].strDrinkThumb);
      $cocktails.textContent = data2.drinks[count].strDrink;
      img.className = 'slideshow-img';
      count++;
      $h2.appendChild(img);
      setTimeout(function () {
        $h2.removeChild(img);
      }, 2500);

    }, 2500);
  }
});
