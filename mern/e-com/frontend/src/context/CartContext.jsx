
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {

    const context = useContext(CartContext);

    if(!context){
        throw new Error("UseAuth must be used within authprovider");
    }

    return context;

}


   
export const CartProvider = ({children}) => {


    // Load from localstroage only once

    const [cartItems, setCartItems] = useState(() => {

        try{

            const savedCart = localStorage.getItem("cart");
            
            return savedCart ? JSON.parse(savedCart) : []

        }catch(err){
            console.log("Error loading cart", err);
            return [];
        }

    })

    // Save whenever cart changes

    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cartItems));
        console.log("Yes cart changed");

    }, [cartItems])


    const addToCart = (product, quantity = 1) => {

        setCartItems((prevItems) => {
            
            const existingItem = prevItems.find(
                (item) => item.product === product._id
            )

            if(existingItem){
                return prevItems.map((item) => 
                item.product === product._id 
                ? {
                  ...item,
                  quantity: item.quantity + quantity
                } : item
                )
            }


            return [
                ...prevItems,
                {
                    product:product._id,
                    name:product.name,
                    price:product.price,
                    image:product.image,
                    quantity
                }
            ]

        })
   
        
    }


    const value = {
        cartItems,
        addToCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}