import React, { useContext } from "react";
import Image from "../components/Image";
import { PhotosContext } from "../contexts/PhotoContext";
import { ImageSize } from "../utils";
import "./Photos.css";

export default function Photos() {
  const { allPhotos } = useContext(PhotosContext);
  const imageElements = allPhotos.map((img, i) => (
    <Image key={img.id} img={img} className={ImageSize(i)} />
  ));

  return <main className="photos">{imageElements}</main>;
}
