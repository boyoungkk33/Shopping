import React, { useEffect } from 'react'
import axiosInstance from '../../utils/axios';

const DetailProductPage = () => {
 
  const {productId} =useParams();
  const [product,setProduct] =usetState(null);

  useEffect(() =>{
    async function fetchProducts(){
      try{
        await axiosInstance.get(`/products/${productId}?type=single`);
        console.logo(response);
        setProduct(response.data[0]);
      }catch(error){
        console.error(error);
          
      }
    }
    fetchProduct();
  },[productId])  
  
  if(!product) return null;
  
  return (
    <section>
    <div className='text-center'>
      <h1 className='p-4 text-2xl'>{product.title}</h1>
    </div>
    <div className='flex gap-4'>
      <div className='w-1/w'>
           {/*ProductImage*/}
       <ProductImage product={product} />
      </div>

      <div className='w-1/2'>
        {/*ProductInfo*/}
        <ProductInfo product={product} />
      </div>
    </div>
    </section>
  )
}

export default DetailProductPage