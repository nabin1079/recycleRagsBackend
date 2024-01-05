


const { addToCart, deleteItemFromCart, updateCartItems, getMyCartItems } = require("../../controller/user/cart/cartController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const { getMaxListeners } = require("../../model/userModel")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()

router.route("/cart").get(isAuthenticated,catchAsync(getMyCartItems))

router.route("/cart/:productId").post(isAuthenticated,catchAsync(addToCart))
.delete(isAuthenticated,catchAsync(deleteItemFromCart)).patch(isAuthenticated,catchAsync(updateCartItems))


module.exports = router 
