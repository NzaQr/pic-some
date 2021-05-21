import React, { useContext } from "react";

import Image from "../components/Image";
import { PhotosContext } from "../contexts/PhotoContext";

function Photos() {
  const { allPhotos } = useContext(PhotosContext);
  const imageElements = allPhotos.map((img) => (
    <Image key={img.id} img={img} />
  ));

  return <main className="photos">{imageElements}</main>;
}

export default Photos;
