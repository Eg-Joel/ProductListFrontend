

const initialState = {
    subcategories: [],
  };
  
  const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SUBCATEGORIES':
        return {
          ...state,
          subcategories: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default subcategoryReducer;