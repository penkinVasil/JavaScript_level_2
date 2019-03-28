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
    <img class="preview">
      <div class="goods-info">
        <h3>{{good.title}}</h3>
        <p>{{good.price}}</p>
      </div>
    <button class="addClick">Добавить</button>
    </div>
  `
})

Vue.component('search', {
  data: function () {
    return {
      searchLine:''
    }
  },
  template: `
    <div class="search">
      <form @submit.prevent="$emit('search', searchLine)" class="search-form">
        <input type="text" v-model="searchLine" class="goods-search">
        <button class="search-button" type="submit">Поиск</button>
      </form>
    </div>
  `,
})

Vue.component('cart-frame', {
  template: `
    <div class="cartFrame">
      <button class="cart-hidden" @click="">&otimes;</button>
    </div>
  `
})  


const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    isVisibleCart: false,
    filteredGoods: []
  },
  methods: {
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      app.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    }, 
    toggleCartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
    },
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
        xhr.open('GET', url, true);
        xhr.send();
      })
    },
    makePOSTRequest(url, data) {
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
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        xhr.send(data)
      })
    }
  },
  async created() {
    try {
      this.goods = await this.makeGETRequest('/catalogData')
      this.filteredGoods = this.goods
    } catch(err) {
      console.error(err)
    }
  }
})


