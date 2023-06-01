import Razorpay from 'razorpay'
import cartModel from "../models/cart.js";
import orderModel from "../models/orderModel.js";
import paymentModel from "../models/payment.js"

const instance = new Razorpay({
    key_id: 'rzp_test_ZPdbuLOnpwMBtq',
    key_secret: '4VURb7xZBPtjG0kMxGw0V1fy',
});


export const createPayment = async (req, res) => {
    let checkProductID = {}
    let productCheckBool = {}
    let totalAmount = 0
    const cartItems = req.body.cart
    for (let i = 0;i<cartItems.length;i++) {
        if(checkProductID[cartItems[i]._id] == undefined) {
            checkProductID[cartItems[i]._id] = 0
        }
        checkProductID[cartItems[i]._id] = checkProductID[cartItems[i]._id] + 1
    }

    // create cart entity before make any payment related stuff
    let cartEntity = []
    let productIDs = []
    for (let i = 0;i<cartItems.length;i++) {
        let id = cartItems[i]._id
        let quantity = checkProductID[id]
        if (productCheckBool[id] != undefined) {
            continue
        }
        let cartOneProduct = cartItems[i]
        totalAmount += cartOneProduct.price * quantity
        productCheckBool[id] = true

        // cart data init
        let crt = {
            userID:req.user._id,
            productID:id,
            quantity:quantity,
            productName:cartOneProduct.name,
            price:cartItems[i].price * quantity,
        }
        cartEntity.push(crt)
        productIDs.push(id)
    }

    // 1) 1st delete all previous cart value 
    let dltResp = await cartModel.deleteMany({userID:req.user._id})

    // 2) then create new cart value
    let resp = await cartModel.insertMany(cartEntity)
   
    // 3) create order and make order as processing
    let orderResp = await orderModel.create({
        products:productIDs,
        buyer:req.user._id,
        cartValue:resp,
    })
   console.log(resp,orderResp)

    let response
    instance.orders.create({
        "amount": totalAmount*100,
        "currency": "INR",
        "receipt": "receipt#1",
        "partial_payment": false,
        "notes": {
            "orderID": orderResp._id,
            "userID": req.user._id,
        }
    })
    .then(resp => {
        paymentModel.create({
            userID:req.user._id,
            razorPayOrderID:resp.id,
            systemOrderID:orderResp._id,
            amount:totalAmount,
        })
        res.status(200).send(resp)
    })
    .catch(err => console.log(err))
}

export const capturePayment = async (req, res) => {
    console.log("hello",req.body, req.params)
}


export const verifyPayment = async (req, res) => {
    console.log(" \n verify payment \n","\n reqbody - "+req.body+"\n ")
    res.status(200).send("ok")
}