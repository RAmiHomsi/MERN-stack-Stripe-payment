import React from "react";
import styles from "./success.module.css";

const Success = () => {
  return (
    <div className={styles.successMessage}>
      You have successfully made a payment!
    </div>
  );
};

export default Success;
