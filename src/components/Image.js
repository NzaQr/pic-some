import React, { useContext, useState } from "react";
import { PhotosContext } from "../contexts/PhotoContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";
import "./Image.css";

export default function Image({ img, className }) {
  const [hovered, setHovered] = useState(false);

  const { toggleFavorite, addToCart, cartItems, removeFromCart } =
    useContext(PhotosContext);

  const handleEnter = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  const favoriteIcon = () => {
    if (img.isFavorite) {
      return (
        <BsHeartFill
          className="favorite"
          onClick={() => toggleFavorite(img.id)}
        />
      );
    } else if (hovered) {
      return (
        <BsHeart className="favorite" onClick={() => toggleFavorite(img.id)} />
      );
    }
  };

  const cartIcon = () => {
    const alreadyInCart = cartItems.some((item) => item.id === img.id);

    if (alreadyInCart) {
      return (
        <RiShoppingCartFill
          className="cart"
          onClick={() => removeFromCart(img.id)}
        />
      );
    } else if (hovered) {
      return (
        <RiShoppingCartLine className="cart" onClick={() => addToCart(img)} />
      );
    }
  };

  return (
    <div
      className={`${className} image-container`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img src={img.download_url} className="image-grid" />
      {favoriteIcon()}
      {cartIcon()}
    </div>
  );
}
