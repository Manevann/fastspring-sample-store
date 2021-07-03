<template>
  <div class="rounded-b shadow-lg flex flex-col bg-gray-700 p-3 max-w-xs w-full z-10 text-gray-100">
    <h2 class="inline self-center text-lg pb-2 px-4 mb-2 border-b-2 border-gray-400">
      Cart
    </h2>
    <span v-if="cart.length === 0" class="text-center py-3 italic text-gray-500">
      No products in cart
    </span>
    <cart-item
      v-for="product in cart"
      :key="product.pid"
      :product="product"
    />
    <div class="w-full mt-4 p-2 rounded bg-gray-800 text-gray-100 grid grid-cols-2 justify-between">
      <label>Subtotal</label>
      <span class="text-right">{{ order.total }}</span>

      <template v-if="order.taxType">
        <label class="text-gray-300 text-sm">{{ order.taxType }} ({{ order.taxRate }})</label>
        <span class="text-gray-300 text-sm text-right">{{ order.tax }}</span>
      </template>

      <label class="text-blue-500 font-semibold text-lg">Total</label>
      <span class="text-blue-500 font-semibold text-lg text-right">{{ order.totalWithTax }}</span>
    </div>
    <button
      class="mt-2 border-gray-100 border-2 rounded text-gray-100 w-full text-center py-2 font-semibold transition-colors hover:bg-blue-800 hover:text-blue-100"
      @click="checkout"
    >
      Checkout
    </button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('fastspring', ['cart']),
    ...mapState('fastspring', ['order'])
  },
  methods: {
    ...mapActions('fastspring', ['checkout'])
  }
}
</script>
