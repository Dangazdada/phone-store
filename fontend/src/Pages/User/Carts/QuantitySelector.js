import React from 'react';
import "./Cart.css"
const QuantitySelector = ({ quantity, onUpdateQuantity }) => {
  const decreaseQuantity = () => {
    if (quantity > 0) {
      onUpdateQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    onUpdateQuantity(quantity + 1);
  };

  return (
    <div className="quantity-selector">
      <button className="quantity-button" onClick={decreaseQuantity}>-</button>
      <span className="quantity-input"> <p>{quantity}</p> </span>
      <button className="quantity-button" onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantitySelector;
