import React, { useContext, useState } from "react";
import { PhotosContext } from "../contexts/PhotoContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";

export default function Image({ img }) {
  const [hovered, setHovered] = useState(false);

  const { toggleFavorite, addToCart, cartItems, removeFromCart } =
    useContext(PhotosContext);

  function handleEnter() {
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
  }

  function favoriteIcon() {
    if (img.isFavorite) {
      return <BsHeartFill onClick={() => toggleFavorite(img.id)} />;
    } else if (hovered) {
      return <BsHeart onClick={() => toggleFavorite(img.id)} />;
    }
  }

  function cartIcon() {
    const alreadyInCart = cartItems.some((item) => item.id === img.id);

    if (alreadyInCart) {
      return <RiShoppingCartFill onClick={() => removeFromCart(img.id)} />;
    } else if (hovered) {
      return <RiShoppingCartLine onClick={() => addToCart(img)} />;
    }
  }

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <img src={img.url} />
      {favoriteIcon()}
      {cartIcon()}
    </div>
  );
}
