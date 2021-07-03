const initialState = () => ({
  order: null,
  builder: null
})

const mutations = {
  ORDER_CHANGED (state, order) {
    state.order = order
  },
  POPUP_CLOSED () {
    // no-op
  },
  INITIATED (state, fastspring) {
    state.builder = fastspring.builder
  }
}

const actions = {
  push ({ state }, session) {
    return new Promise((resolve, reject) => {
      if (!state.builder) {
        reject(new Error('Fastspring library not initialized!'))
        return
      }

      state.builder.push(session, (order) => {
        resolve(order)
      })
    })
  },
  addToCart ({ getters: { productByProductId }, dispatch }, productId) {
    const product = productByProductId(productId)
    return dispatch('push', {
      products: [
        {
          path: product.pid,
          quantity: product.selected ? product.quantity + 1 : 1
        }
      ]
    })
  },
  removeFromCart ({ dispatch }, productId) {
    return dispatch('push', {
      products: [
        {
          path: productId,
          quantity: 0
        }
      ]
    })
  },
  checkout ({ state }) {
    if (!state.builder) { throw new Error('Fastspring library not initialized!') }
    state.builder.checkout()
  }
}

const getters = {
  cart (state) {
    if (!state.order) { return [] }

    const itemsInCart = []
    state.order.groups.forEach((group) => {
      if (group.selections) {
        group.items.forEach((item) => {
          if (item.selected) {
            itemsInCart.push(item)
          }
        })
      }
    })
    return itemsInCart
  },
  products (state) {
    if (!state.order) { return null }
    return state.order.groups.find(
      group => group.driverType === 'storefront'
    ).items
  },
  productByProductId: (_, { products }) => (productId) => {
    return products && products.find(product => product.pid === productId)
  }
}

const store = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}

export default store
