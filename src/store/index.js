import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [],
    order: null,
    filters: [],
    menuItemExpanded: false
  },
  getters: {
  },
  mutations: {
    addToCart(state, item){
      state.cart.push(item)
    },
    updateCartItem(state, {idx, item}){
      state.cart[idx] = item
    },
    removeItemFromCart(state, idx){
      state.cart.splice(idx, 1)
    },
    setOrder(state, data){
      state.order = {
        ...data,
        items: state.cart
      }
      state.cart = []
    },
    setFilters(state, filters){
      state.filters = filters
    }
  },
  actions: {
    
  },
  modules: {
  }
})
