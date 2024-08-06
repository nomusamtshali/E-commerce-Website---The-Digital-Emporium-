<script setup>
  import { ref, onMounted } from 'vue';
  import CardSkeleton from './CardSkeleton.vue';
  import Error from './Error.vue';
  import ProductFilter from './ProductFilter.vue';
  import ProductSort from './ProductSort.vue';
  
  /**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product
 * @property {string} title - The title of the product
 * @property {number} price - The price of the product
 * @property {string} category - The category of the product
 * @property {string} image - The URL of the product image
 * @property {Object} rating - The rating information of the product
 * @property {number} rating.rate - The average rating of the product
 * @property {number} rating.count - The number of ratings for the product
 */

 /** @type {import('vue').Ref<Product[]>} */
  const products = ref([]);

  /** @type {import('vue').Ref<Product[]>} */
  const filteredProducts = ref([]);

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /** @type {import('vue').Ref<string|null>} */
  const error = ref(null);

  /** @type {import('vue').Ref<string[]>} */
  const categories = ref([]);

  /** @type {import('vue').Ref<string>} */
  const selectedCategory = ref('');

  /** @type {import('vue').Ref<string>} */
  const selectedSort = ref('default');
  
  /**
 * Fetches and processes product data from the API  
 * @async
 * @function getProducts
 * @throws {Error} When the API request fails
 */
  async function getProducts() {
    try {
      let response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      products.value = await response.json();
      categories.value = [...new Set(products.value.map(product => product.category))];
      filteredProducts.value = [...products.value];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
      sortProducts(selectedSort.value);
    }
  }
  
  /**
 * Fetches and processes product data for a specific category from the API.
 * @async
 * @function getProductsByCategory
 * @param {string} category - The category to fetch products for
 * @throws {Error} When the API request fails
 */
  async function getProductsByCategory(category) {
    try {
      loading.value = true;
      error.value = null;
      let response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      products.value = await response.json();
      filteredProducts.value = [...products.value];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
      sortProducts(selectedSort.value);
    }
  }
  
  /**
 * Handles the change of selected category.
 * @function handleCategoryChange
 * @param {string} category - The newly selected category
 */
  function handleCategoryChange(category) {
    selectedCategory.value = category;
    if (selectedCategory.value) {
      getProductsByCategory(selectedCategory.value);
    } else {
      getProducts();
    }
  }
  
  /**
 * Sorts the products based on the selected option.
 * @function sortProducts
 * @param {string} option - The sorting option ('lowToHigh', 'highToLow', or 'default')
 */
  function sortProducts(option) {
    selectedSort.value = option;
    if (option === 'lowToHigh') {
      filteredProducts.value = filteredProducts.value.sort((a, b) => a.price - b.price);
    } else if (option === 'highToLow') {
      filteredProducts.value = filteredProducts.value.sort((a, b) => b.price - a.price);
    } else {
      filteredProducts.value = [...products.value];
    }
  }
  
  /**
 * Handles the change of sorting option.
 * @function handleSort
 * @param {string} option - The new sorting option
 */
  function handleSort(option) {
    sortProducts(option);
  }
  
  // Fetches product data when the component is mounted.
  onMounted(() => {
    getProducts();
  });
  </script>
  
  <template>
    <div>
      <div class="container">
        <ProductFilter :categories="categories" :selectedCategory="selectedCategory" @categoryChange="handleCategoryChange" />
        <ProductSort @sortChange="handleSort" />
      </div>
      <div v-if="loading" class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          <CardSkeleton v-for="index in 20" :key="index" />
        </div>
      </div>
      <Error v-else-if="error" :message="error" />
      <div v-else-if="filteredProducts.length > 0" class="grid justify-center">
        <div class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">
          <a v-for="product in filteredProducts" :key="product.id" :href="`/products/${product.id}`" class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden">
            <img class="object-contain h-48 mt-3" :src="product.image" :alt="product.title" />
            <div class="flex-1 flex flex-col p-6">
              <div class="flex-1">
                <header class="mb-2 flex-2">
                  <h2 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">{{ product.title }}</h2>
                </header>
              </div>
              <div class="flex items-left -ml-2 mb-2">
                <svg v-for="index in Math.round(product.rating.rate)" :key="index" class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg v-for="index in (5 - Math.round(product.rating.rate))" :key="index" class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
                <h2>$ {{ product.price }}</h2>
              </div>
              <div class="flex mt-1 space-x-2 my-3">
                <div class="justify-start flex-1">
                  <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ product.category }}</span>
                </div>
                <div class="justify-end space-x-2">
                  <button aria-label="Add to Favourites">
                    <svg class="me-1.5 h-5 w-5 hover:fill-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" transform="scale(1.6)">
                      <path stroke="currentColor" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button class="flex rounded-lg justify-center mt-3 bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
                Add To Cart
              </button>
            </div>
          </a>
        </div>
      </div>
      <p v-else class="grid justify-center">No products found.</p>
    </div>
  </template>
  
  
  
  <style scoped>
  .container {
    display: grid;
    gap: 1rem; 
    column-gap: 12rem;
    margin-top: 0.75rem; 
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  }
  
  @media (min-width: 1024px) { 
    .container {
      display: flex;
      align-items: flex-start;
    }
  }
  </style>
  