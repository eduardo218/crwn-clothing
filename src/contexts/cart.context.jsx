import { useState, createContext } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setCardIsOpened: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const value = {isCartOpen, setIsCartOpen}

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
} 