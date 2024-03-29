import {Fragment, useContext} from 'react'
import {Outlet} from 'react-router-dom'

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CardDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {

    const { currentUser } = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)
    
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CardDropdown /> }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation