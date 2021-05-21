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
        <h1 className="header-title">Pic Some</h1>
      </Link>
      <div className="header-links">
        <Link to="/dashboard" className="user-link">
          {currentUser ? (
            <h2 className="header-account">My Account</h2>
          ) : (
            <h2 className="header-account">Log In</h2>
          )}
          <AiOutlineUser className="header-user" />
        </Link>
        <Link to="/checkout" className="cart-link">
          {cart}
        </Link>
      </div>
    </div>
  );
}
