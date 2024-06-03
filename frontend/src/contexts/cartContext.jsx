import dynamic from 'next/dynamic'
import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext()

const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  RESET: 'RESET',
  REHYDRATE: 'REHYDRATE'
}

const initialState = {
  cart: [], // [{ items, quantity }]
  total: 0
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.REHYDRATE:
      return {
        ...action.data.state
      }
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.some(cartItem => cartItem.item.id === action.data.id)
          ? state.cart.map((cartItem) => {
            return cartItem.item.id === action.data.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          })
          : state.cart.concat([{ item: action.data, quantity: 1 }]),
        total: state.cart.length > 0
          ? state.cart.reduce((prev, cur) => prev + (cur.item.attributes.price * cur.quantity), action.data.attributes.price)
          : action.data.attributes.price
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        cart: state.cart.map(cartItem => {
          return cartItem.item.id === action.data.item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        }).filter(cartItem => cartItem.quantity > 0),
        total: state.cart.length > 0
          ? state.cart.reduce((prev, cur) => prev + (cur.item.attributes.price * cur.quantity), -action.data.item.attributes.price)
          : action.data.attributes.price
      }
    case actionTypes.RESET:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const contextFactory = (dispatch) => ({
  addToCart: (item) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: item
    })
    toast('Produit ajouté au panier', { type: 'success' })
  },
  removeFromCart: (item) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: item
    })
  }
})

// Using dynamic to create the context on client side only
const CartProvider = dynamic(Promise.resolve(({ children }) => {
  const persistedState = typeof window !== 'undefined' && window.localStorage.getItem('cart')
  const _initialState = persistedState ? JSON.parse(persistedState) : initialState
  const [state, dispatch] = useReducer(cartReducer, _initialState)
  // Persistance du panier
  useEffect(() => {
    typeof window !== 'undefined' && window.localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  return <CartContext.Provider value={{ state, ...contextFactory(dispatch) }}>{children}</CartContext.Provider>
}), { ssr: false })

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside a CartProvider')
  return context
}

export {
  actionTypes,
  CartProvider,
  useCart
}
