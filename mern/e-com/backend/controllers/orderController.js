import Order from "../models/Order.js";


// @desc Create a new order
// @route Post /api/orders


export const createOrder = async(req, res) => {

    try{

        const { orderItems, totalPrice, shippingAddress } = req.body;

        if(orderItems && orderItems.length === 0){
            res.status(400).json({message:"No order items"});
            return;
        }

        const order = new Order({
            user:req.user._id,
            orderItems,
            totalPrice,
            shippingAddress
        })

        const createOrder = await order.save();

        res.status(201).json(createOrder);
 

    }catch(error){
        res.status(500).json({message:error.message})
    }

}



// @desc Get my order
// @route Post /api/orders/myorders


export const getMyOrders = async(req, res) => {

    try{

        const orders = await Order.find({user:req.user._id})
        res.json(orders);
 

    }catch(error){
        res.status(500).json({message:error.message})
    }

}


// @desc Get my order
// @route Post /api/orders/:id

export const getOrdersById = async(req, res) => {

    try{

        const order = await Order.findById(req.params.id);

        if(order){
          res.json(order);
        }else{
            res.status(404).json({message:"Order not found"})
        }
       
 

    }catch(error){
        res.status(500).json({message:error.message})
    }

}

// @desc Get all order
// @route Post /api/orders

export const getAllOrders = async(req, res) => {

    try{

        const orders = await Order.find({});
        res.json(orders);
       

    }catch(error){
        res.status(500).json({message:error.message})
    }

}

// @desc Update order status (admin only)
// @route put /api/orders/:id/status

export const updateOrderStatus = async(req, res) => {

    try{

        const {status} = req.body;

      

        const order = await Order.findById(req.params.id);

        console.log(req.params);

        if(order){
        
          order.status = status  

          const updatedOrder = await order.save()
          
          res.json(updatedOrder);
        }else{
            res.status(404).json({message:"Order not found"})
        }
       

    }catch(error){
        res.status(500).json({message:error.message})
    }

}