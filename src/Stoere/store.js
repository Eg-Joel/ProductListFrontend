

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import categoryReducer from './categoryReducer';
import subcategoryReducer from './subCategory';
import productReducer from './ProductReducer';


const rootReducer = combineReducers({
  categories: categoryReducer,
  subcategories: subcategoryReducer, 
  products: productReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;