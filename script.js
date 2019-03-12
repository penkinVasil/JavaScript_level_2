const goods = [
  { title: 'Shirt',     price: 150, image: "shirt.jpg",  alt: "shirt" },
  { title: 'Socks',     price: 50,  image: "socks.jpg",  alt: "socks" },
  { title: 'Jacket',    price: 350, image: "jacket.jpg", alt: "jacket"},
  { title: 'Shoes',     price: 250, image: "shoes.jpg",  alt: "shoes" },
  { title: 'Hat',       price: 120, image: "hat.jpg",    alt: "hat"   },
  { title: 'Pants',     price: 180, image: "pants.jpg",  alt: "pants" },
  { title: 'Waistcoat', price: 100, image: "vest.jpg",   alt: "vest"  },
  { title: 'Scarf',     price: 70,  image: "scarf.jpg",  alt: "scarf" },
  { title: 'Gloves',    image: "gloves.jpg",  alt: "gloves"},
  { },
  { },
  { }, 
  
];

// значения по умолчанию, если отсутствуют товар его цена и изображение 

const renderGoodsItem = (title, price, image, alt)=> 
  `<div class="goods-item">
    <img class="preview" src="images/${image||"no-image.jpg"}" alt=${alt||'фото'}> 
    <div class="goods-info">
      <h3>${title||'Товар отсутствует'}</h3>
      <p>${price||'Цена по запросу'}</p>
    </div>
    <button class='addClick'>
      <span class="textButton">Добавить<span>
    </button>
  </div>`; 


const renderGoodsList = list => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image, item.alt));
  document.querySelector('.goods-list').innerHTML = goodsList.join(''); 
  // .join с добавлением пробела убирает запятые после каждого товара на странице!!!
}

window.onload = () => {
  renderGoodsList(goods);
};