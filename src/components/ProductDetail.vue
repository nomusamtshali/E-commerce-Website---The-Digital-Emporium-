<script setup>
  import { ref, onMounted } from 'vue';
  import Error from './Error.vue';
  import DetailSkeleton from './DetailSkeleton.vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const product = ref({});
  const error = ref(null);
  const loading = ref(false);
  const id = route.params.id;
  
  // Fetches product details from the API based on the provided productId.
  async function getProductDetails(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return { response: data, error: null };
    } catch (err) {
      return { response: null, error: err.message };
    }
  }
  
  // On component mount, fetch product details and handle loading and error states.
  onMounted(async () => {
    loading.value = true;
    const { response, error: fetchError } = await getProductDetails(id);
    if (fetchError) {
      error.value = fetchError;
    } else {
      product.value = response;
    }
    loading.value = false;
  });
  </script>
  
  <template>
    <div>
      <div v-if="error" class="flex justify-center p-5">
        <Error :message="error" />
      </div>
      <div v-else-if="loading" class="flex justify-center p-5">
        <DetailSkeleton />
      </div>
      <div v-else class="grid m-10 space-y-5">
        <a class="w-20px" href="/">
          <button class="bg-cyan-500 text-gray-500 py-2 px-4 rounded">Back to Products</button>
        </a>
        <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl">
          <div class="mx-auto w-2/5 flex-none">
            <img :src="product.image" :alt="product.title" class="w-[85%] h-[85%]" />
          </div>
          <div class="mx-auto w-[90%] space-y-2 mt-20">
            <h1 class="text-2xl md:text-4xl lg:text-4xl font-bold">{{ product.title }}</h1>
            <div v-if="product.rating" class="flex gap-2">
              <svg
                v-for="index in Math.round(product.rating.rate)" :key="index"
                class="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <div>{{ product.rating.rate }}</div>
              <div>Reviews: {{ product.rating.count }}</div>
            </div>
  
            <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              {{ product.category }}
            </span>
  
            <h3 class="text-xl md:text-2xl lg:text-2xl font-bold">${{ product.price }}</h3>
            <button class="bg-cyan-700 hover:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem] text-white font-bold py-2 px-4 rounded">
              Add To Cart
            </button>
            <h2 class="text-lg font-bold">Description</h2>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  