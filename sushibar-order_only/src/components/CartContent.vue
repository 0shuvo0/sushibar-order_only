<template>
    <div>
        <div class="cart-items-container">
           <CartItem
             v-for="(item, index) in cart"
             :key="index"
             :itemIdxInCart="index"
             :item="item"
           />
        </div>
        <div class="mt-2" v-if="cart.length">
            <div class="cart-service-charge">
                <span class="prop">Service charge ({{SERVICE_CHARGE}}%)</span>
                <span class="val">£{{serviceCharge}}</span>
            </div>
            <div class="cart-service-charge cart-subtotal">
                <span class="prop">Subtotal</span>
                <span class="val">£{{(+total + +serviceCharge).toFixed(2)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'

const SERVICE_CHARGE = 12.5

export default {
    components: {
        CartItem
    },
    data(){
        return {
            SERVICE_CHARGE
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart
        },
        total(){
            return this.cart
                        .map(item => +item.totalPrice)
                        .reduce((acc, val) => acc + val, 0)
                        .toFixed(2)
        },
        serviceCharge(){
            return (this.total * (SERVICE_CHARGE / 100)).toFixed(2)
        }
    }
}
</script>

<style lang="scss">
.cart-items-container{
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.cart-service-charge{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: var(--color-body);
    margin-top: .5em;
    padding-bottom: .5em;
    &:not(:last-child){
        border-bottom: 1px solid #E3E3E3;
    }
    &.bb-0{
        border-bottom: 0 !important;
    }
}
.cart-subtotal{
    color: var(--color-dark);
}
</style>