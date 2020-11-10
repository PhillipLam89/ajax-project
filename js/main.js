var xhr = new XMLHttpRequest();
var $h2 = document.querySelector('h2');
var interval = null;
var count = 1;
var $cocktails = document.querySelector('.cocktails-text');

xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {

  var data = xhr.response;
  interval = setInterval(function () {
    if (count > xhr.response.length) {
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
    }, 2500);

  }, 2500);
});
xhr.send();
clearInterval(interval);
