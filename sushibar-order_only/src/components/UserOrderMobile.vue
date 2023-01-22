<template>
    <div>
        <p class="title-text">Your order</p>
        <p class="cart-item-edit-info" v-if="cart.length !== 0">
            <i class="bi bi-bell-fill"></i> Click any item to edit or remove it.
        </p>
        <p class="subtitle-text mt-05" v-if="cart.length === 0">Your basket is empty.</p>
        <CartContent />
        <button
            class="btn btn-block checkout-btn mt-2"
            :disabled="cart.length === 0"
            :class="{active: cart.length > 0}"
            @click="placeOrder"
        >Place order</button>
    </div>
</template>

<script>
import CartContent from './CartContent.vue'

const SERVICE_CHARGE = 12.5

export default {
    components: {
        CartContent
    },
    computed: {
        cart(){
            return this.$store.state.cart
        },
        total(){
            const total = this.cart.map(item => +item.totalPrice)
                                    .reduce((acc, val) => acc + val, 0)
            return total.toFixed(2)
        },
        serviceCharge(){
            return (this.total * (SERVICE_CHARGE / 100)).toFixed(2)
        }
    },
    methods: {
        placeOrder(){
            this.$store.commit('setOrder', {
                total: this.total,
                subtotal: (+this.total + +this.serviceCharge).toFixed(2),
                serviceChargePercentage: SERVICE_CHARGE,
                serviceChargeAmount: this.serviceCharge
            })
            this.$router.push({
                path: '/order-placed'
            })
        }
    }
}
</script>