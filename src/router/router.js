import { createRouter, createWebHistory } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import ProductDetail from '../components/ProductDetail.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ProductCard },
    { path: '/products/:id', component: ProductDetail }
  ]
});

export default router;
