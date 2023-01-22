<template>
    <div class="page menu-page">
      <div class="page-banner">
        <img src="@/assets/banners/home.jpg" alt="">
        <div class="banner-overlay"></div>
      </div>
  
      <div class="page-content after-page-banner">
        <div class="col main container-px container-py">
          <div class="text-center">
            <div class="waiter-called-icon order-placed-icon">
              <svg width="63" height="43" viewBox="0 0 63 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.23853 21.643L21.7026 40.1071C22.0954 40.4999 22.7318 40.5014 23.1264 40.1105L60.2569 3.33008" stroke="#788DA1" stroke-width="5.04587" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="text-center title-text">Your order is on its way</p>
            <p class="text-center subtitle-text mt-05">
              Order #171-8259874
            </p>
            <div class="cart-items-container mt-4">
              <div
               class="cart-item no-shadow"
               v-for="(item, index) in order.items"
               :key="index"
              >
                <span class="item-qty">{{item.qty}}</span>
                <div class="item-data">
                    <p class="item-name-price">
                        <span class="item-name">{{item.title}} (£{{item.price.toFixed(2)}})</span>
                        <span class="item-price">£{{getTotal(item)}}</span>
                    </p>
                    <p
                    class="item-option text-left"
                    v-for="(option, index) in getOptions(item)"
                    :key="index"
                    >{{option}}</p>
                </div>
            </div>
            </div>
            <div class="cart-service-charge mt-2">
                <span class="prop">Service charge ({{order.serviceChargePercentage}}%)</span>
                <span class="val">£{{order.serviceChargeAmount}}</span>
            </div>
            <div class="cart-service-charge bb-0 cart-subtotal">
                <span class="prop">Subtotal</span>
                <span class="val">£{{order.subtotal}}</span>
            </div>

            <div class="ordered-page-actions">
              <router-link to="/" class="btn btn-transparent back-btn">Back to menu</router-link>
              <GetReceiptBtn />
            </div>
          </div>
        </div><!-- /Main col -->
  
        <div class="col side transparent">
          <OrderThankYou />
          <CallAWaiterSection />
        </div><!-- /Side col -->
      </div>
      
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from '@/components/Footer.vue'
  import CallAWaiterSection from '@/components/CallAWaiterSection.vue'
  import OrderThankYou from '@/components/OrderThankYou.vue'
  import GetReceiptBtn from '@/components/GetReceiptBtn.vue'

  export default {
    components: {
      Footer,
      OrderThankYou,
      CallAWaiterSection,
      GetReceiptBtn
    },
    created(){
      if(!this.$store.state.order){
        this.$router.push({ path: '/' })
      }
    },
    computed: {
      order(){
        return this.$store.state.order || {}
      }
    },
    methods: {
      getOptions(item){
        if(!item.optionGroups) return []
            return item.optionGroups.map(g => {
                if(!g.selectedCount) return []
                console.log('1');
                return g.activeOptionIdxs.map(i => {
                    const option = g.options[i]
                    return `${option.title} (£${option.price.toFixed(2)})`
                })
            }).flat()
      },
      getTotal(item){
        let price = item.price
        if(!item.optionGroups) return price
        item.optionGroups.map(g => {
            if(!g.selectedCount) return price
            return g.activeOptionIdxs.map(i => {
                const option = g.options[i]
                price += option.price
            })
        })
        return price.toFixed(2)
      }
    }
  }
  </script>

<style lang="scss">
.order-placed-icon.waiter-called-icon{
  --size: 110px;
}
.cart-item.no-shadow{
  box-shadow: none;
  background-color: transparent;
  min-height: 40px;
  padding: 0;
}
.ordered-page-actions{
  display: flex;
  justify-content: flex-end;
  margin-top: 4em;
  & >.btn.back-btn{
    color: var(--color-body) !important;
  }
  & > .btn.receipt-btn{
    background-color: var(--color-body) !important;
    width: 180px;
    margin-left: 1em;
  }
}
</style>

<style lang="scss" scoped>
svg, svg path{
  fill: none !important;
}
</style>