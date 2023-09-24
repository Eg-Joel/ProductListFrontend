const initialState = {
  allProducts: [],
  productsByCategory: {}
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
      };
      case 'SET_PRODUCTS_BY_CATEGORY':
        return {
          ...state,
          productsByCategory: {
            ...state.productsByCategory,
            [action.payload.categoryId]: action.payload.products,
          },
        };
    default:
      return state;
  }
};

export default productReducer;