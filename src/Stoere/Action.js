
import axios from '../utils/axios';

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('category/mainCategory');
      dispatch(setCategories(res.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };
};

export const setSubcategories = (subcategories) => ({
  type: 'SET_SUBCATEGORIES',
  payload: subcategories,
});

export const fetchSubcategories = (categoryID) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`category/subCategory/${categoryID}`);
      dispatch(setSubcategories(res.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };
};