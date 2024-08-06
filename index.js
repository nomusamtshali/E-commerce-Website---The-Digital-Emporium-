import { createStore } from "vuex";
import productStore from "./src/store/productStore";

export default createStore({
  modules: {
    productStore,
  },
});
