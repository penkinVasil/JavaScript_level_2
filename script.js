Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods"
        :key="good.id"
        :good="good"></goods-item>
    </div>
  `
})

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <slot></slot>
      <h3>{{good.title}}</h3>
      <p>{{good.price}}</p>
    </div>
  `
})

Vue.component('search', {
  data: function () {
    return {
      searchLine:''
    }
  },
  props:['goods'],
  template: `
    <div class="search">
      <form @submit.prevent="filterGoods" class="search-form">
        <input type="text" v-model="searchLine" class="goods-search">
        <button class="search-button" type="submit">Искать</button>
      </form>
    </div>
  `,
  methods: {
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      app.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    } 
  }
})

Vue.component('cart-button', {
  template: `
    <button class="cart-button" @click="toggleCartVisibility">
      <span class="textButton">Корзина</span>
    </button>
  `,
  methods: {
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
      console.log(this.isVisibleCart);
    }
  }
})

Vue.component('cart-frame', {
  data: function () {
    return {
      isVisibleCart: '',
    }
  }, 
  template: `
    <div class="cartFrame" v-if="isVisibleCart">
      <button class="cart-hidden" @click="toggleCartVisibility">&otimes;</button>
    </div>
  `,
  methods: {
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
      console.log(this.isVisibleCart);
    }
  }
})  


const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    isVisibleCart: false,
    filteredGoods: []
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest
        ? new window.XMLHttpRequest() : new window.ActiveXObject()
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText))
            }
            reject(new Error())
          }
        }
        xhr.open('GET', url, true)
        xhr.send()
      })
    }
  },
  async created() {
    try {
      this.goods = await this.makeGETRequest('http://localhost/catalog.json')
      this.filteredGoods = this.goods
    } catch(err) {
      console.error(err)
    }
  }
})