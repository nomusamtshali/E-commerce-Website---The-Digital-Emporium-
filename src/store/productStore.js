import { getCategories, fetchSingleProduct } from '../../api';

export default {
  namespaced: true,
  state: () => ({
    products: [],
    originalProducts: [],
    loading: false,
    error: false,
    sorting: "default",
    searchTerm: "",
    filterItem: "All categories",
    categories: [],
  }),
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      state.originalProducts = JSON.parse(JSON.stringify(products));
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SORTING(state, sorting) {
      state.sorting = sorting;
    },
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    SET_FILTER_ITEM(state, category) {
      state.filterItem = category;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    UPDATE_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const response = await fetch(
          state.filterItem !== "All categories"
            ? `https://fakestoreapi.com/products/category/${state.filterItem}`
            : `https://fakestoreapi.com/products`
        );
        if (!response.ok)
          throw new Error(
            "Data fetching failed, please check your network connection"
          );

        const data = await response.json();
        commit("SET_PRODUCTS", data);
        commit("SET_LOADING", false);
        this.dispatch("productStore/sortProducts");
        this.dispatch("productStore/searchProducts");
      } catch (error) {
        commit("SET_ERROR", error.message);
        commit("SET_LOADING", false);
      }
    },
    async fetchCategories({ commit }) {
      const { response, error } = await getCategories();
      if (error) {
        commit("SET_ERROR", error);
      } else {
        commit("SET_CATEGORIES", response);
      }
    },
    setSorting({ commit, dispatch }, sorting) {
      commit("SET_SORTING", sorting);
      dispatch("sortProducts");
    },
    setSearchTerm({ commit, dispatch }, searchTerm) {
      commit("SET_SEARCH_TERM", searchTerm);
      dispatch("searchProducts");
    },
    setFilterItem({ commit, dispatch }, category) {
      commit("SET_FILTER_ITEM", category);
      dispatch("fetchProducts");
    },
    sortProducts({ state, commit }) {
      let sortedProducts = state.originalProducts.slice();
      if (state.sorting !== "default") {
        sortedProducts = sortedProducts.sort((a, b) =>
          state.sorting === "low" ? a.price - b.price : b.price - a.price
        );
      }
      commit("UPDATE_PRODUCTS", sortedProducts);
    },
    searchProducts({ state, commit }) {
      let filteredProducts = state.originalProducts.slice();
      if (state.searchTerm.trim() !== "") {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      commit("UPDATE_PRODUCTS", filteredProducts);
    },
  },
};
