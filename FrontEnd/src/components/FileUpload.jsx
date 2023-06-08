import React from 'react'
import Dropzone from 'react-dropzone'
import axiosInstance from '../utils/axios';
const FileUpload = (onImageChange,images) => {
  
  const handleDrop =(file) =>{
    let formData =new FormData();

    const config ={
        header: {'content-type':'multipart/form-data'}

    }
    formData.append('file,files')
    try{
      const response= await axiosInstance.post('/product/image',frmData,config)
      onImageChange([...images,response.data.fileName]);
    }catch(error){
        console.error(error);
    }
  }

  const handleDelete = (image) => {
    const currentIndex =images.indexOF(image);
    let newImages = [...images]; 
    newImages.splice(currentIndex,1);
    onImageChange(newImages);
    
  }
  
  
    return (
    <div className='flex gap-4'>
<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section
      className='min-w-[300px] h-[300px] border flex items-center justify'
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className='text-3xl'>+</p>
      </div>
    </section>
  )}
</Dropzone>
    <div className='flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden '>
       {images.map(image=> (
           <div key={image} onClick={() =>handleDelete(image)}>
            <img
            className='min-w-[300px] h-[300px]'
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image}
        />
         </div>
        ))}
    </div>
    </div>
  )
}

export default FileUpload