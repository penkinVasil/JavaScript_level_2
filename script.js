function makeGETRequest(url, myPromise) {
  const xhr = window.XMLHttpRequest 
  ? new window.XMLHttpRequest(): new window.ActiveXObject();

  
    const myPromise = () => {
    return new Promise((resolve, reject) => {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText);
      } else {
        reject('Error');
      }
    })   
  
}

    const testFunk = async() => {
    try {const res = await myPromise();
    console.log(res);
    } catch(err) {
        console.error(err); 
    }
  }  
testFunk(); 

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
  }
  // метод добавления товара в корзину  
  addGood(event) {
    const myGoods = list.goods;
    const idButton = event.target.id;
    const i = idButton - 1;
      if (idButton == myGoods[i].id) {
        const productTitle = myGoods[i].title;
        const productPrice = myGoods[i].price;
        this.cartFull.push(productTitle, productPrice); 
        this.basketItemPrice.push(productPrice);
        this.basketItem.push(productTitle); 
      }
    //console.log(this.cartFull);
    console.log('Список товаров: ' + this.basketItem.join(', '));
    myBasket.calcSum();  // вызов метода суммарной стоимости
  }
  //  метод, определяющий суммарную стоимость всех товаров 
  calcSum() {
    const totalSum = this.basketItemPrice.reduce((sum, current) => {
      return sum + current;
    });
    console.log('Всего товаров в корзине: ' + this.basketItem.length);  
    console.log('Общая стоимость: ' + totalSum);
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
  // метод удаления товара из корзины     (!!! НЕ ДОРАБОТАН)
  remove(event) {
    const idButton = event.target.id;
    const i = idButton - 1;
    
    this.basketItem.splice(i, 1);

    console.log('Список товаров: ' +  this.basketItem.join(', '));
    console.log('Всего товаров в корзине: ' + this.basketItem.length);   
  }
}
const myBasket = new GoodsBasket();

