import React, { useContext, useState } from "react";
import CartItem from "../components/CartItem";
import { PhotosContext } from "../contexts/PhotoContext";
import { useAuth } from "../contexts/AuthContext";

export default function Checkout() {
  const { currentUser } = useAuth();

  const [buttonText, setButtonText] = useState("Place Order");
  const { cartItems, emptyCart } = useContext(PhotosContext);
  const calcCost = 5.99 * cartItems.length;
  const totalCost = calcCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const cartItemElements = cartItems.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  function orderMessage() {
    if (cartItems.length > 0 && currentUser) {
      return <button onClick={placeOrder}>{buttonText}</button>;
    } else if (cartItems.length === 0 && currentUser) {
      return <p>You have no items in your cart.</p>;
    } else if (cartItems.length === 0) {
      return <p>You have no items in your cart.</p>;
    } else {
      return <p>Create an account to continue your payment.</p>;
    }
  }

  function placeOrder() {
    setButtonText("Ordering...");
    setTimeout(() => {
      setButtonText("Place Order");
      emptyCart();
    }, 3000);
  }

  return (
    <div>
      <h1>Check Out</h1>
      {cartItemElements}
      <p>Total: {totalCost}</p>
      {orderMessage()}
    </div>
  );
}
