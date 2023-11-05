import "./App.css";
import Cart from "./components/cart/Cart";
import ProductItem from "./components/productItem/ProductItem";
import { Routes, Route } from "react-router-dom";
import Success from "./components/success/Success";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <div>
      <CartProvider>
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <Cart />
                <ProductItem />
              </>
            }
          ></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
