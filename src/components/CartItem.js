import React, { useContext } from "react";
import { PhotosContext } from "../contexts/PhotoContext";
import { MdDelete } from "react-icons/md";
import "./CartItem.css";

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(PhotosContext);
  return (
    <div className="item-container">
      <img src={item.download_url} width="200px" />

      <div className="item-bottom">
        <p className="item-price">$5.99</p>
        <MdDelete
          className="delete-icon"
          onClick={() => removeFromCart(item.id)}
        />
      </div>
    </div>
  );
}
