import axios from '../../utils/axios';

export const setProductCounts = (productCounts) => ({
  type: 'SET_PRODUCT_COUNTS',
  payload: productCounts,
});
export const fetchProductCounts = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get('product/categoryCount');
        dispatch(setProductCounts(res.data));
      } catch (error) {
        console.error('Error:', error);
      }
    };
  };
  
export const setAllProducts = (products) => ({
  type: 'SET_ALL_PRODUCTS',
  payload: products,
});


export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('product/getProducts');
      dispatch(setAllProducts(res.data));
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };
};

export const setProductsByCategory = (categoryProducts) => ({
  type: 'SET_PRODUCTS_BY_CATEGORY',
  payload: categoryProducts,
});

export const fetchProductsByCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`product/getCategoryProducts/${categoryId}`);
      dispatch(setProductsByCategory({ categoryId, products: res.data }));
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
    }
  };
};