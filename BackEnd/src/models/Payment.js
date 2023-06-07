const {default: mongoose} = require("mongoose");

const paymentSchema = mongoose.Schema({
 user:{
    type:Object //구매한 사람
 },
 deta:{
    type:Array,  //결제 정보들(ex.paypal 결제 정보)
    default:[]
 },
 product:{
    type:Array, //구매한 상품 정보들
    default:[]
 }
},{timestamps: true})
const Payment =mongoose.model("Payment", paymentSchema);

module.exports=Product;
