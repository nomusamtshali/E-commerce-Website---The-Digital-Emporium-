/**
 * Fetches a list of product categories from the FakeStore API.
 *
 *  - On success, returns an object with the property 'response' containing the fetched data.
 *  - On failure, returns an object with the property 'error' containing the error message.
 */
export const getCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      if (!response.ok) {
        throw new Error("Data fetching failed, please check your network connection");
      }
      const data = await response.json();
      return { response: data };
    } catch (error) {
      return { error: error.message };
    }
  };
  
  /**
   * Fetches a single product by its ID from the FakeStore API.
   *
   * @param {number} productId - The ID of the product to fetch.
   *
   *  - On success, returns an object with the property 'response' containing the fetched data.
   *  - On failure, returns an object with the property 'error' containing the error message.
   */
  export const fetchSingleProduct = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error("Data fetching failed :( , please check your network connection and reload.");
      }
      const data = await response.json();
      return { response: data };
    } catch (error) {
      return { error: error.message };
    }
  };
  