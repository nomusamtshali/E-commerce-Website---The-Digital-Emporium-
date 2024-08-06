<script setup>
import Header from './components/Header.vue';
import ProductCard from './components/ProductCard.vue';
import ProductDetail from './components/ProductDetail.vue';

// Define routes
const routes = [
  { path: '/', component: ProductCard },
  { path: '/products/:id', component: ProductDetail }
];

// const router = useRouter();
// const route = useRoute();
</script>

<template>
  <div>
    <Header />
    <router-view/> 
  </div>
</template>