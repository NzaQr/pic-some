import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

import { PhotosContext } from "../contexts/PhotoContext";
import { useAuth } from "../contexts/AuthContext";

import "./Header.css";

export default function Header() {
  const { currentUser } = useAuth();
  const { cartItems } = useContext(PhotosContext);

  const cart =
    cartItems.length > 0 ? (
      <RiShoppingCartFill className="header-cart" />
    ) : (
      <RiShoppingCartLine className="header-cart" />
    );

  return (
    <div className="header">
      <Link to="/" className="title-link">
        <h2>Pic Some</h2>
      </Link>
      <div className="header-links">
        <Link to="/account" className="user-link">
          {currentUser ? (
            <h2 className="header-account">Your Account</h2>
          ) : (
            <h2 className="header-account">Log In</h2>
          )}
          <AiOutlineUser className="header-user" />
        </Link>
        <Link to="/cart" className="cart-link">
          {cart}
        </Link>
      </div>
    </div>
  );
}
