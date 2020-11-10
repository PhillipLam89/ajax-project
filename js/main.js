var xhr = new XMLHttpRequest();
var $h2 = document.querySelector('h2')
var interval = null
var count = 0


xhr.open('GET', 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);
  data = xhr.response

  interval = setInterval(function(){
    var img = document.createElement('img')
    img.setAttribute('src', data.drinks[count].strDrinkThumb)
    count++
    img.className = 'slideshow-img'
    $h2.appendChild(img)
    setTimeout(function(){
      $h2.removeChild(img)
    },2000)

    if (count === 11) {
      count = 0
    }

  },2000)

});

xhr.send();
