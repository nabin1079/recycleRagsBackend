const router = require("express").Router()
const { createProduct, getProducts, getproduct, deleteProduct, editProduct } = require("../../controller/user/product/productController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const {multer,storage}=require("../../middleware/multerConfig")
const catchAsync = require("../../services/catchAsync")
const upload = multer({storage:storage})



router.route("/products")
.post(isAuthenticated,restrictTo("admin","customer"),upload.single('productImage'),catchAsync(createProduct))
.get(catchAsync(getProducts))

router.route("/products/:id").get(catchAsync(getproduct)).delete( isAuthenticated,restrictTo("admin","customer"),catchAsync(deleteProduct))
.patch(isAuthenticated,restrictTo("admin","customer"),upload.single('productImage'),editProduct)



module.exports = router
