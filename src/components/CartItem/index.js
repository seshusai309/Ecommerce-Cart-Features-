import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item

      const incrementButtonClick = () => {
        incrementCartItemQuantity(id)
      }

      const devrementButtonClick = () => {
        decrementCartItemQuantity(id)
      }

      return (
        <li className="cart-item">
          <img alt={title} className="cart-product-image" src={imageUrl} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                data-testid="minus"
                type="button"
                className="quantity-controller-button"
                onClick={devrementButtonClick}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                data-testid="plus"
                type="button"
                className="quantity-controller-button"
                onClick={incrementButtonClick}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            data-testid="remove"
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
