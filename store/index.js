export default {
  state: () => ({
    cartOpen: false
  }),
  mutations: {
    CART_DISPLAY_SET (state, visible) {
      state.cartOpen = visible
    },
    CART_DISPLAY_TOGGLE (state) {
      state.cartOpen = !state.cartOpen
    }
  },
  actions: {
    showCart ({ commit }) {
      commit('CART_DISPLAY_SET', true)
    },
    hideCart ({ commit }) {
      commit('CART_DISPLAY_SET', false)
    },
    toggleCart ({ commit }) {
      commit('CART_DISPLAY_TOGGLE')
    }
  }
}
