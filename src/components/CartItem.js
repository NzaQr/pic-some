import React, { useContext } from "react";
import { PhotosContext } from "../contexts/PhotoContext";
import { MdDelete } from "react-icons/md";

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(PhotosContext);
  return (
    <div>
      <MdDelete onClick={() => removeFromCart(item.id)} />
      <img src={item.download_url} width="130px" />
      <p>$5.99</p>
    </div>
  );
}
