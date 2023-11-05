import React, { useContext } from "react";
import styles from "./cart.module.css";
import { CartContext } from "../../context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = () => {
  const { isOpen, toggleCart, removeProduct, products } =
    useContext(CartContext);
  //The loadStripe function asynchronously loads and give access to stipe
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

  const handleCheckout = async () => {
    const lineItems = products.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // because stripe interprets price in cents
        },
        quantity: item.quantity,
      };
    });

    const { data } = await axios.post("http://localhost:4000/checkout", {
      lineItems,
    });

    const stripe = await stripePromise;

    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cartIcon} onClick={toggleCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span className={styles.cartNumber}>{products?.length}</span>
        </div>
        {isOpen && (
          <div className={styles.cartContainer}>
            {products?.length > 0 ? (
              <>
                <h4>Products</h4>
                <div className={styles.productContainer}>
                  {products.map((product) => (
                    <div className={styles.product} key={product.id}>
                      <img src={product.img} alt="" />
                      <div className={styles.productDetails}>
                        <h3>
                          {product.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            onClick={() => removeProduct(product)}
                            className={styles.close}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </h3>

                        <span>
                          {product.quantity} x ${product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.controls}>
                  <button type="submit" onClick={handleCheckout}>
                    Checkout
                  </button>
                  <span onClick={toggleCart}>Close cart</span>
                </div>
              </>
            ) : (
              <h3>No products</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
