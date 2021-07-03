<template>
  <div class="flex items-center">
    <img class="w-12 h-12 rounded shadow overflow-hidden" :src="product.image" alt="">
    <h3 class="flex-grow mx-2">
      {{ product.display }}
      <span v-if="product.quantity > 1" class="text-gray-500">
        x{{ product.quantity }}
      </span>
    </h3>
    <button
      class="text-sm text-red-600 py-1 px-2 transition-colors hover:bg-black hover:bg-opacity-30 rounded"
      @click="remove"
    >
      <span v-if="removingFromCart">Removing..</span>
      <span v-else>Remove</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      removingFromCart: false
    }
  },
  methods: {
    ...mapActions('fastspring', ['removeFromCart']),
    async remove () {
      this.removingFromCart = true
      await this.removeFromCart(this.product.pid)
      this.removingFromCart = false
    }
  }
}
</script>
