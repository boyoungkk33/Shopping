import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      const imageArray = product.images.map((imageName) => ({
        original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
        thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
      }));
      setImages(imageArray);
    }
  }, [product]);

  return <ImageGallery items={images} />;
};

export default ProductImage;
