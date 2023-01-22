import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import OrderPlacedView from '@/views/OrderPlacedView'
import CartView from '@/views/CartView'
import PreviousOrdersView from '@/views/PreviousOrdersView'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu/:menu/:id',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/order-placed',
    namer: 'order-placed',
    component: OrderPlacedView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/previous-orders',
    name: 'previous-orders',
    component: PreviousOrdersView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
