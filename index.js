const mongoose = require('mongoose')
const express = require('express')
const userRoute = require('./routes/userRoutes')
const cart_route = require('./routes/cartRoute')
const storeRoute = require('./routes/storeRoute')
const categoryRoute = require('./routes/categoryRoute')
const product_route = require('./routes/productRoute')
const sub_category_routes = require('./routes/subCategoryRoute')
const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/ghulamullah')
app.use('/user', userRoute)
app.use('/store', storeRoute)
app.use('/category',categoryRoute) 
app.use('/product',product_route) 
app.use('/sub',sub_category_routes) 
app.use('/cart',cart_route) 
app.listen(3, function () {
    console.log("Listening on Port 3")
})