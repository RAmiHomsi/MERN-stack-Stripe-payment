import React, { useContext } from "react";
import styles from "./productItem.module.css";
import { products } from "../../data/data";
import { CartContext } from "../../context/cartContext";

const ProductItem = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div className={styles.product} key={product.id}>
          <img src={product.img} alt="" />
          <div className={styles.productDetails}>
            <h3>{product.name} </h3>
            <span>${product.price}</span>
          </div>
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
