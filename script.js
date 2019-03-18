function makeGETRequest(url, callback) {
  const xhr = window.XMLHttpRequest 
  ? new window.XMLHttpRequest(): new window.ActiveXObject('Microsoft.XMLHTTP');

  xhr.onreadystatechange = function () {
    return new Promise((resolve, reject) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(callback(xhr.responseText));
        console.log("Запрос выполнен успешно!");
      } else if (xhr.status !== 200 && xhr.status !== 0 ){ 
        reject(xhr.status + " Error");
      }
    })   
  }

  xhr.open('GET', url, true);
  xhr.send();
}


class GoodItem {
  constructor(id, title = 'Товар отсутствует', price = 'Цена по запросу', image = 'no-image.jpg', alt = 'фото') {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    this.alt = alt;
  }
  render() {
    return `<div class="goods-item">
            <img class="preview" src="images/${this.image}" alt=${this.alt}>
              <div class="goods-info">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
              </div>
              <button id = ${this.id} class='addClick' onclick = "myBasket.addGood(event), myBasket.removeButton(event)">Добавить</button>
              <button class='delClick' onclick = "myBasket.remove(event)">удалить</button>
            </div>`; 
  }
}

class GoodsList {
  constructor() {
    this.goods = []
  }
  fetchGoods() {
    makeGETRequest('catalog.json', (goods) =>{
      this.goods = JSON.parse(goods);
      this.render();
    })
  }
  render() {
    let listHtml = '';
    this.goods.forEach((good) => {
      const goodItem = new GoodItem(good.id, good.title, good.price, good.image, good.alt)
      listHtml += goodItem.render()
    })
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

const list = new GoodsList();

window.onload = () => {
  list.fetchGoods();
};


// класс корзины товаров 

class GoodsBasket {
  constructor() {
    this.basketItem = [];
    this.basketItemPrice = [];
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
    this.basketItemPrice.splice(i, 1);
    console.log('Список товаров: ' +  this.basketItem.join(', '));
    myBasket.calcSum();
  }
}
const myBasket = new GoodsBasket();

