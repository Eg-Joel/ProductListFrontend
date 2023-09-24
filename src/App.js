
import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import Products from './pages/Products/Products';
import ListingPage from './pages/ListingPage/ListingPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={  <Home />}></Route>
      <Route  path="/category" element={  <Category />}></Route>
      <Route  path="/product" element={  <Products />}></Route>
      <Route  path="/listing" element={  <ListingPage />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
