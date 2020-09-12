const path = require('path')
const Product = require('../models/adminModels/add-product')
const User = require('../models/adminModels/user')

exports.addProducts = (req,res,next)=>{
    console.log("add-prodyuct")
    res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','edit-product'),{editing:false})
}

exports.addProductsData = (req,res,next)=>{
    console.log("post-data",req.user)
    const productdata = req.body
    req.user.createProduct({
        title:productdata.title,
        specification:productdata.specification,
        amount:productdata.amount,
        imagePath:productdata.imagePath,
    })
.then(result=>{
    Product.findAll()
    .then(result=>{
        console.log("fffffffffffff",result)
        res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','admin-index'),{products:result})
    })
    
})
.catch(err=>{
    console.log("object err",err)
})
}

exports.editProductsData = (req,res,next)=>{
    const user = req.user 
    Product.findByPk(req.body.prodid)
    .then(result=>{
        result.title = req.body.title,
        result.amount = req.body.amount,
        result.specification = req.body.specification,
        result.imagePath = req.body.imagePath
        result.save()
        .then(rrrr=>{
            Product.findAll()
            .then(result=>{
            console.log("fffffffffffff",result)
            res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','admin-index'),{products:result})
        })
        })
        .catch(er=>{
            console.log(er)
        })
          
 
    })
    .catch(er=>{
        console.log(er)
    })
  
}

exports.geteditProduct = (req,res,next)=>{
    console.log("req.query.editing",req.query.edit)
    const prod_id = req.params.prodID
        req.user
    .getProducts({ where: {id:req.params.prodID} })
   // Product.findByPk(prod_id)
    .then(result=>{
        console.log("ggooooof",result[0])
        
        res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','edit-product'),{editing:req.query.edit,product:result[0]})
    })
    .catch(err=>{
        console.log("eeeeeeeeeeeerrrrrrrrrrrr")
    })
   
}

exports.getadminIndex = (req,res,next)=>{
    console.log("get admin index111111")
    Product.findAll()
    .then(result=>{
        res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','admin-index'),{products:result})
    })
    .catch(err=>{
        console.log("admin index",err)
    })
}

exports.getProductDetails = (req,res,next)=>{
    console.log("getProductDetails")
    Product.findByPk(req.params.prodid)
    .then(result=>{
        console.log("opoopopoppp",result)
        res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','product-detail'),{product:result})
    })
}

exports.deleteProduct = (req,res,next)=>{
    console.log("deledte")
    const deleteId = req.params.prodID

    Product.destroy({where:{id:deleteId}})
    .then(r=>{
        Product.findAll()
    .then(result=>{
        res.render(path.join(path.dirname(process.mainModule.filename),'views','admin-pages','admin-index'),{products:result})
    })
    })
}