<script setup>
 import { defineProps } from 'vue';

 /**
 * @typedef {Object} Props
 * @property {Function} onSortChange - Callback function for sort change
 */
  
 /**
 * @type {Props}
 */
  const props = defineProps({onSortChange: {type: Function, required: true}})
  
  /**
 * Handles the change of sorting option
 * @param {Event} event - The change event
 */
  const handleSort = (event) => {
    props.onSortChange (event.target.value);
  };
  </script>

  <template>
    <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
      <label for="sort" class="w-20 my-auto font-semibold">Sort by: </label>
      <select
        id="sort"
        class="p-2.5 w-full max-w-[21rem] text-sm text-gray-900 bg-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        @change="handleSort"
        
      >
        <option value="default">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  </template>
  

  