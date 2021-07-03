<template>
  <div ref="container" />
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted () {
    // We need some global callback functions that the FS script can reference
    window.onFsDataCallback = this.ORDER_CHANGED
    window.onFsPopupClosed = this.POPUP_CLOSED

    const script = document.createElement('script')
    script.src = 'https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.8.5/fastspring-builder.min.js'
    script.type = 'text/javascript'
    script.async = true

    script.setAttribute('id', 'fsc-api')
    script.setAttribute('data-storefront', this.$config.fastspringStorefrontId)
    script.setAttribute('data-data-callback', 'onFsDataCallback')
    script.setAttribute('data-popup-closed', 'onFsPopupClosed')
    script.setAttribute('data-continuous', 'true')

    script.addEventListener('load', () => this.INITIATED(window.fastspring))

    this.$refs.container.appendChild(script)
  },
  methods: {
    ...mapMutations('fastspring', ['ORDER_CHANGED', 'POPUP_CLOSED', 'INITIATED'])
  }
}
</script>
