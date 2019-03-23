const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: []
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest 
        ? new window.XMLHttpRequest(): new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
            } 
            reject(new Error("Error"));
          }
        }
        xhr.open('GET', url, true);
        xhr.send();
      })   
    },
    filterGoods() {
      const searchButton = document.querySelector(".search-button");
      const searchInput = document.querySelector(".goods-search");
      searchButton.addEventListener('click', () => {
        const value = searchInput.value; 
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        app.searchLog();
      }) 
    },
    searchLog() {                     
      const searchInput = document.querySelector(".goods-search");
      const value = searchInput.value; 
      this.searchLine.push(value);     // Недоработка: при каждом клике делает делает лишний проход и добавление в массив;
      console.log(this.searchLine);
    },
    showCart() {
      const cartButton = document.querySelector(".cart-button");
      const cartFrame = document.querySelector(".cartFrame");
      cartButton.addEventListener('click', () => {
        cartFrame.setAttribute('style','display: block;');
      })
    },
    hideCart() {
      const cartHidden = document.querySelector(".cart-hidden");
      const cartFrame = document.querySelector(".cartFrame");
      cartHidden.addEventListener('click', () => {
        cartFrame.setAttribute('style','display: none;');
      })
    }
  },

  async created() {
    try {
      this.goods = await this.makeGETRequest('http://localhost/catalog.json')
      this.filteredGoods = this.goods; 
    }catch(err) {
      console.error(err);
    }
  }
})


// класс корзины товаров 

class GoodsBasket {
  constructor() {
    this.basketItem = [];
    this.basketItemPrice = [0];
    this.cartFull = [];
    this.itemCount = 0;
  }
  // метод добавления товара в корзину  
  addGood(event) {
    const myGoods = list.goods;
    const idButton = event.target.id;
    const i = idButton - 1;
    if (idButton == myGoods[i].id) {
        this.cartFull.push(myGoods[i].title, myGoods[i].price); 
        this.basketItemPrice.push(myGoods[i].price);
        this.basketItem.push(myGoods[i].title); 
      }   
    console.log('Список товаров: ' + this.basketItem.join(', ')); 
    myBasket.calcSum();    
  }
  calcSum() {
    const totalSum = this.basketItemPrice.reduce((sum, current) => {
      return sum + current;
    });
    console.log('Всего товаров в корзине: ' + this.basketItem.length + ' на сумму ' + totalSum);  
  } 
  //  метод появления кнопки Удалить после нажатия кнопки Добавить
  removeButton(event) {
    const idButton = event.target.id;
    const i = idButton - 1;
    const visibleRemove = document.getElementsByClassName('delClick');
    visibleRemove[i].setAttribute('id', idButton);
    visibleRemove[i].setAttribute('style','visibility: visible;');
  }
  //  метод исчезновения кнопки Удалить при отсутствии в корзине соответствующего товара
  removeButtonHidden() {
   
  }
  // метод удаления товара из корзины    !!! не доработано
  remove(event) {
    const idButton = event.target.id;
    const i = idButton - 1;
    this.basketItem.splice(i, 1);
    this.basketItemPrice.splice(i+1, 1);
    console.log('Список товаров: ' +  this.basketItem.join(', '));
    myBasket.calcSum();
  }
}
const myBasket = new GoodsBasket();

