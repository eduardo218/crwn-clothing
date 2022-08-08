import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import {ProductCardContainer, Footer} from './product-card.styles'

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product
    const {addItemToCart} = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)

        return (
            <ProductCardContainer>
                <img src={imageUrl} alt={`${name}`}/>
                <Footer>
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </Footer>
                <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
            </ProductCardContainer>
        )
}

export default ProductCard