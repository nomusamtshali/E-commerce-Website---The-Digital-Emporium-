<script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';

  /**
 * @typedef {Object} Props
 * @property {Array} [categories=[]] - List of available categories
 * @property {string} [selectedCategory=''] - Currently selected category
 * @property {string} [searchTerm=''] - Current search term
 * @property {Function} [onCategoryChange=()=>{}] - Callback function for category change
 */
  
 /**
 * @type {Props}
 */
  const props = defineProps({
    categories: {type: Array, default: () =>{}},
    selectedCategory: {type: String, default: ''}, 
    searchTerm: {type: String, default: ''},
    onCategoryChange: {type: Function, default: () => {}}
  })

  /** @type {import('vue').Ref<string>} */
  const selectedCategory = ref(props.selectedCategory);

  /** @type {import('vue').Ref<string>} */
  const searchTerm = ref(props.searchTerm);


/** @type {import('pinia').StoreToRefs} */
  const store = storeToRefs();


// Watch for changes in props and update local refs
  watchEffect(() => {
    selectedCategory.value = props.selectedCategory
    searchTerm.value = props.searchTerm;
  })
  
  /**
 * Sets the search term in the store
 * @param {string} term - The search term to set
 */
  const setSearchTerm = (term) => {
    store.dispatch('productStore/setSearchTerm', term);
  };
  
  /**
 * Handles the change of category
 * @param {Event} event - The change event
 */
  const handleChange = (event) => {
    props.onCategoryChange(event.target.value);
  };
  
  /**
 * Handles the form submission
 */
  const handleSubmit = () => {
    store.dispatch('productStore/fetchProducts');
  };
</script>

<template>
    <form @submit.prevent="handleSubmit">
      <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">
        <div>
          <label for="category" class="w-20 my-auto font-semibold"></label>
          <select
            id="category"
            v-model="selectedCategory"
            @change="handleChange"
            class="inline-flex w-full px-4 py-2 hover:bg-gray-100"
          >
            <option value="">All categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
  
        <div class="relative w-full max-w-xs">
          <input
            type="search"
            id="search-dropdown"
            name="searchInput"
            class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            v-model="searchTerm"
            @input="setSearchTerm(searchTerm)"
          />
          <button
            type="submit"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  </template>
  
 