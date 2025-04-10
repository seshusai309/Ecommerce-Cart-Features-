import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const sum = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
      return (
        <div className="checkout-container">
          <div>
            <h1>
              Order Total <span>Rs{sum}/-</span>
            </h1>
            <p className="totallengthSummary">
              {cartList.length} Items in cart
            </p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
