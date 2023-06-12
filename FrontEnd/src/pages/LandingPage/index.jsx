import React, { useState } from 'react'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchInput from './Sections/SearchInput'
import CardItem from './Sections/CardItem'
import axiosInstance from '../../utils/axios'



const LandingPage = () => {

  const limit =4;
  const [searchTerm, setSearchTerm] =useState('');
  const [products, setProducts] =useState([]);
  const [skip, setSkip] =useState(0);
  const [hasMore , setHasMore] =useState(false);
  const [filters,setFilters] =useState({
    continents:[],
    price:[]
  })
  useEffect(() =>{
    fetchProducts({skip,limit});

  },[])

    const fetchProducts =async ({skip,limit,loadMore =false, filters={},searchTerm=""}) =>{
     const params={
      skip,
      limit,
      filters,
      searchTerm
    } 
    //asc-오름차순 desc-내림차순
    try{ 
      const response = await axiosInstance.get('/products', {params})
     
      if(loadMore){
        setProducts([...products, ...response.data.products])
      }else{
        setProducts(response.data.products);
      }
        setHasMore(response.data.haseMore);    
    } catch(error){
      console.error(error)
    }
    }
   
    const handleLoadMore = () =>{
     const body ={
        skip:skip+limit,
        limit,
        loadmore: true,
        filters,
        searchTerm:searchTerm
     }
     fetchProducts(body);
     setSkip(skip+ limit)

    }
         
    const handleFilters= (newFilteredData, category) =>{
      const newFilters ={...filters};
      newFilters[category] =newFilteredData;
      if(category ==='price'){
        const priceValues =handlePrice(newFilteredData);
        newFilters[category] = priceValues
      }

      showFilteredResults(newFilters);
      setFilters(newFilters);
    }
    const handlePrice=()=>{
      let array =[];
      
      for(let key in prices){
        if(prices[key]._id === parseInt(value,10)){
          array = prices[key].array
        }
      }
      return array;
    }
    const showFilteredResults =(filters) =>{
      console.log(filters);
      const body={
        skip: 0,
        limit,
        filters,
        searchTerm
      }
      fetchProducts(body);
      setSkip(0);
    }
    
    const handleSearchTerm = (event) =>{
     const body ={
      skip:0,
      limit,
      filters,
      searchTerm:event.target.value
     }
     setSkip(0);
     setSearchTerm(event.target.value);
     fetchProducts(body);
    }

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>여행 상품 사이트</h2>
      </div>
      {/* Filter*/}
      <div className='flex gap-3'>
        <div className='w-1/2'>
          <CheckBox continents={continents} checkedContinents={filters.continents}
          onFilters={filters => handleFilters(filters, "continents")}
        />
        </div>
        <div className='w-1/2'>
          <RadioBox prices={prices} checkedPrice={filters.price}
           onFilters={filters => handleFilters(filters,"price")}
         />
        </div>
      </div>


      {/*search*/}
      <div className='flex justify-end mb-3'>
        <SearchInput  searchTerm={searchTerm} onSearch={handleSearchTerm}/>
      </div>

      {/*card*/}
      <div className='grid grid-cols-2 sm:grid-cols-4'>
        {products.map(product =>
          <CardItem products={product} key={product._id}/>
          )}
       
      </div>

      {/*LoadMore*/}
      {hasMore &&
      <div className='flex justify-center mt-5'>
      <button className='px-4 py-2 mt-5 text-white bg-black rounded=md hover:bg-gray-500'>
      </button>
      </div> 
    }
    </section>
  )
}

export default LandingPage