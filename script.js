const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnLeft = $('.fa-chevron-left')
const btnRight = $('.fa-chevron-right')
const productWraps = $$('.product__wrap');
let currentIndex = 0 ;
console.log(currentIndex)
btnLeft.addEventListener("click", function () {
    if (currentIndex === 0) {
      currentIndex = productWraps.length - 3;
    } else {    
      currentIndex = (currentIndex  + productWraps.length - 1) % productWraps.length;
    }
    showItems(currentIndex, currentIndex + 3);
})

btnRight.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % productWraps.length;
    showItems(currentIndex, currentIndex + 3);
})

const showItems = (startIndex, endIndex) => {
    productWraps.forEach((productWrap, index) => {
      if (index >= startIndex && index < endIndex) {
        productWrap.classList.remove('hidden');
      } else {
        productWrap.classList.add('hidden');
      }
    });
  };