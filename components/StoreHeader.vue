<template>
  <div class="w-full shadow z-30">
    <header class="grid grid-cols-3 justify-between items-center max-w-screen-md mx-auto relative">
      <img class="h-12 py-2 px-4 w-auto" src="~/assets/square_transparent-dark-blue_no-text.png" alt="">
      <h1 class="text-center">
        The Moon Water Store
      </h1>
      <button
        class="h-full px-4 justify-self-end focus:outline-none transition-colors duration-300"
        :class="{
          'bg-gray-700 text-gray-300 hover:bg-gray-800': cartOpen,
          'hover:bg-black hover:bg-opacity-30': !cartOpen
        }"
        @click="toggleCart"
      >
        {{ cart.length }} {{ cart.length !== 1 ? 'items' : 'item' }} in cart
      </button>
      <cart
        v-if="order"
        class="absolute bottom-0 right-0 transition duration-300 transform translate-y-full"
        :class="{
          'opacity-100 visible': cartOpen,
          'opacity-0 invisible': !cartOpen
        }"
      />
    </header>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['cartOpen']),
    ...mapState('fastspring', ['order']),
    ...mapGetters('fastspring', ['cart'])
  },
  methods: {
    ...mapActions(['toggleCart'])
  }
}
</script>
