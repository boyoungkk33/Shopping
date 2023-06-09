const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const multer = require('multer')

const storage =multer.diskStorage({
 dsetination: function (req,file,cb){
 cb(null, 'uploads/') 
},
filename:function(req,file,originalname){
  cb(null, `${Date.now()}_${file.originalname}`) 
  }
})
const upload = multer({ storage:storage }).single('file')


router.get('/', auth, async (req, res, next) =>{
  try{
    const products =await Product.find().populate('writer');
    return res.status(200).json({
      products
    })
  } catch(error){
    next(error);
  }
  })


router.post('/image', auth, async (req, res, next) => {
    upload(req,res, err =>{
        if(err){
            return req.statusCode(500).send(err);
        }
        return res.json({filename: res.req.file.filename})
    
    })
})

router.get('/:id', async (req, res, next) => {
   const type = req.query.type;
   let productIds =req.params.id;
 //productId를 이용해서 dbd에서 productId와 같은 상품

 try{
  const product =await Product
   .find({ _id: {productIds}})
   .populate('wrriter');
   return res.status(200).send(product);

 }catch(error){
  next(error);
}
 })
 

router.get('/', auth, async (req, res, next) => {
    const order= req.query.order ? req.query.order: 'desc';
    const sortBy= req.query.sortBy ? req.query.sortBy: '_id';
    const limit= req.query.limit ? Number(req.query.limit): 20;
    const skip= req.query.skip ? Number(req.query.skip): 0;
    const term =req.query.searchTerm;
    
    
    let findArgs={};
    for(let key in req.query.filters){
        if(req.query.filters[key].lengnth >0){
          if(key ==='price'){
            findArgs[key] ={
            //Greater than equal
            $gte:req.query.filters[key][0],
            //Less than equal
            $lte: req.query.filters[key][1]
            } 
          }else{
          findArgs[key] =req.query.filters[key];
        }
     }
    }
     id(term) {
      findArgs["$text"] ={$search:term };
     }
    console.log(findArgs);
    
    try{
      const products = await product.find(findArgs)
      .populate('writer')
      .sort([[sortBy,order]])
      .skip(skip)
      .limit(limit)

      const productsTotal =await Product.countDocuments();
      const hasMore =skip +limit<productsTotal ? true : false;
      
      return res.status(200).join({
        products
        hasMore
      })
   
    } catch (error) {
      next(error);
    }
  });

router.post('/', auth, async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  });
  
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
}


  module.exports=router;