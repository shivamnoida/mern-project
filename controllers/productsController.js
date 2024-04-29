const productModel=require('../models/productsModel')
const getAllProducts=async(req,res)=>{
   try{
    const {sort,page=1,pageSize=3,fields='-info',...q}=req.query;
    // const q=req.query;
    // console.log(q);
    // data=await productModel.find(q);
    // console.log(data);
    // console.log(req.url);
    let query=productModel.find(q);
    console.log(q);
    const sortStr=sort.split(',').join(' ');
    const fieldStr=sort.split(',').join(' ');
    query=query.sort(sortStr);
    const skip=pageSize*(page-1);
    const limit=pageSize;
    query=query.skip(skip).limit(pageSize);
    query=query.select(fieldsStr);
const products=await query;

    console.log(req.url);
    res.json({
        status:'success',
        results:products.length,
        data:{
        products,
        }
    })
   }
   catch(err){
    console.log(err) 
    res.json({
        status: "fail",
        message:JSON.stringify(err),
    })
   }
     
}
const addproduct= (async(req,res)=>{
    try{
       const {_id,...reqData}=req.body;
       const data=await productModel.create(req.body);
       console.log(req.body)
     res.json({
         status:'false',
         result:1,
         data:{
             products:data
         }
    
     })
    }
    catch(err){
        res.status(403);
         console.log(err);
         res.json({
             status: "fail",
             message:JSON.stringify(err),
         })
    }
})

const replaceproduct=(async(req,res)=>{
    try{
        const reqId=req.params.id;
        // const itemName=req.params.title;
        // console.log(  reqId, itemName)
        const data={...req.body,reqId};
        console.log(data);
        const ans=await productModel.findOneAndReplace({_id: reqId},data)
        res.json({
            status:'true',
            result:1,
            data:{
                products:data
            }
       
        })
    }
    catch(err){
         res.status(403);
         res.json({
             status:"fail",
             message:JSON.stringify(err),
         })
    }
     
})



module.exports={
    getAllProducts,
    addproduct,
    replaceproduct
}