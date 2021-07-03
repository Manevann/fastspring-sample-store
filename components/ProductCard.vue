<template>
  <div class="rounded-lg shadow-lg hover:shadow-xl max-w-prose overflow-hidden transition-shadow duration-500">
    <div class="aspect-h-9 aspect-w-16 bg-blue-800">
      <img class="h-full w-auto mx-auto" src="~/assets/square_transparent-white_no-text.png" alt="">
    </div>
    <div class="flex p-4 items-center">
      <div class="flex-grow">
        <h2 class="pb-4 text-xl font-semibold text-gray-800">
          {{ title }}
        </h2>
        <p class="text-gray-600">
          {{ description }}
        </p>
      </div>
      <div class="flex flex-col items-center justify-around">
        <div class="pb-2 text-lg whitespace-nowrap">
          <span
            v-if="price"
          >
            {{ price }}
          </span>
          <span
            v-else
          >
            Loading..
          </span>
        </div>
        <button
          :disabled="!canBuyProduct"
          class="whitespace-nowrap py-2 px-4 rounded text-gray-100 transition-colors duration-500"
          :class="{
            'bg-blue-800 hover:bg-blue-600': canBuyProduct,
            'cursor-not-allowed bg-gray-600 hover:bg-gray-600': !canBuyProduct,
            'cursor-wait': addingToCart
          }"
          @click="add"
        >
          <span v-if="addingToCart">Adding..</span>
          <span v-else>Add to cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      addingToCart: false
    }
  },
  computed: {
    ...mapGetters('fastspring', ['productByProductId']),
    product () {
      return this.productByProductId(this.productId)
    },
    price () {
      if (!this.product) {
        return null
      }

      return this.product.total
    },
    canBuyProduct () {
      return !!this.product
    }
  },
  methods: {
    ...mapActions(['showCart']),
    ...mapActions('fastspring', ['addToCart']),
    async add () {
      this.addingToCart = true
      await this.addToCart(this.productId)
      this.addingToCart = false
      this.showCart()
    }
  }
}
</script>
