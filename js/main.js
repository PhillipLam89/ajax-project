var xhr = new XMLHttpRequest();
var $h2 = document.querySelector('h2')
xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);
  data = xhr.response

  var img = document.createElement('img')
  img.setAttribute('src', data.drinks[0].strDrinkThumb)
  img.className = 'slideshow-img'
  $h2.appendChild(img)
});

xhr.send();
