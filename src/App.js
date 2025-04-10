import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    this.setState(each => ({
      cartList: each.cartList.filter(eached => eached.id !== id),
    }))
  }

  addCartItem = product => {
    const {id, quantity} = product
    const {cartList} = this.state
    if (cartList.length > 0) {
      if (!cartList.find(search => search.id === id)) {
        this.setState({cartList: [...cartList, product]})
      } else {
        const value = cartList.map(val => {
          if (val.id === id) {
            return {...val, quantity: val.quantity + quantity}
          }
          return {...val}
        })
        this.setState({cartList: value})
      }
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const value = cartList.map(val => {
      if (val.id === id) {
        return {...val, quantity: val.quantity + 1}
      }
      return {...val}
    })
    this.setState({cartList: value})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const value = cartList.map(val => {
      if (val.id === id) {
        if (val.quantity - 1 === 0) {
          return {}
        }
        return {...val, quantity: val.quantity - 1}
      }
      return {...val}
    })

    this.setState({
      cartList: value.filter(each => {
        const len = Object.keys(each).length
        return len > 0
      }),
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
