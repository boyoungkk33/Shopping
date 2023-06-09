import React from 'react'
import ImageGallery from 'reat-image-gallery'
const ProductImage = ({product}) => {
    const[images, setImages] =useSate([]);
    
    useEffect(() =>{
        if(product?.images?.length>0 ){
            let images=[];

            product.images.map(imageName =>{
            return images.push({
                original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                thumbnail:`${import.meta.env.VITE_SERVER_URL}/${imageName}`,
            }) 
        })

        setImages(imgaes)
    }

},[product])

  return (
    <ImageGallery items={imgaes} />
  )
}
export default ProductImage