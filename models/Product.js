const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    
    productName:{
        type: String,
        required: true,
        unique: true,


    },
   price :{
    type: String,
    required: true,
    

   } ,

   category :{
    type: [
        {
            type: String,
            enum: ['veg', 'non-veg'],
        },
    ],


   },
   image:{

    type: String,
        default: 'default-image.jpg',
   },

   bestSeller:{

     type:String

   },

   description:{

     type:String

   },

   firm: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm',  // Ensure this is 'Firm' (capital 'F')
}], 


})

const product = mongoose.model('product', ProductSchema);

module.exports=product