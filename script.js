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
              <button id = ${this.id} class='addClick' onclick = "myBasket.addGood(event)">Добавить</button>
            </div>`; 
  }
}

class GoodsList {
  constructor() {
    this.goods = []
  }
  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Shirt', price: 150, image: "shirt.jpg", alt: "shirt"},
      { id: 2, title: 'Socks', price: 50, image: "socks.jpg",  alt: "socks"},
      { id: 3, title: 'Jacket', price: 350, image: "jacket.jpg", alt: "jacket"},
      { id: 4, title: 'Shoes', price: 250, image: "shoes.jpg",  alt: "shoes"},
    ]
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
list.fetchGoods();


window.onload = () => {
  list.render()
};



/*-------------- ДЗ Lesson_2 -----------------*/


// класс корзины товаров 

class GoodsBasket {
  constructor() {
    this.basketItem = [];
    this.basketItemPrice = [];
    this.count = 1;
  }
  // метод добавления товара в корзину  
  addGood(event) {
    const myGoods = list.goods;
    const idButton = event.target.id;
    const i = idButton - 1;
      if (idButton == myGoods[i].id) {
        const productTitle = myGoods[i].title;
        const productPrice = myGoods[i].price;
        this.basketItem.push(productTitle, productPrice);
        this.basketItemPrice.push(productPrice);
      }
    console.log(this.basketItem);
    myBasket.calcSum();
  }
  //  метод, определяющий суммарную стоимость всех товаров 
  calcSum() {
    const totalSum = this.basketItemPrice.reduce((sum, current) => {
      return sum + current;
    });
    console.log('Всего товаров в корзине: ' + this.count++);  
    console.log('Общая стоимость: ' + totalSum);
  } 
}
const myBasket = new GoodsBasket();

