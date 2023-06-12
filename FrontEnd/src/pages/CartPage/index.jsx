import React from 'react'
import { useSelector } from 'react-redux'
const CartPage = () => {

    const userData =useSelector(state => state.user?.userData);  
    const dispatch =userDispatch();
   
     useEffect(() => {
       let cartItemIds =[]

       if(userData?.cart&& userData.cart >0 ){
        userData.cart.forEach(item =>{
          cartItemIds.push(item.id);
        })
        const body ={
          cartItemIds,
          userCart:userData.cart
        }
       
        dispatch(getCartItems (body))
     
}

}, [dispatch,userData])
      
return(
  <div>CartPage</div>

)
}