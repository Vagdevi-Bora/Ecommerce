import { useDispatch, useSelector } from "react-redux";
import { cartSelector, decreaseQty, deleteFromCart, increaseQty } from "../redux/cartReducer";
import styles from "../styles/cart.module.css";
import { localCart } from "../redux/cartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Shopping from "./shopping";
import { ToastContainer, toast } from 'react-toastify';

export default function Cart() {
     const cartItems = useSelector(cartSelector);
     const dispatch = useDispatch();

     useEffect(() => {
          if (cartItems.length === 0) {
               const localData = JSON.parse(localStorage.getItem('cartData')) || [];
               dispatch(localCart(localData));
          }
     }, []);

     const totalAmount = () => {
          let total = 0;
          cartItems.forEach((item) => {
               total += item.price * item.qty
          })
          return total;
     }

     // delete item from cart 
     const handleDelete = (item) => {
          dispatch(deleteFromCart(item.id));
          toast.warn('item deleted from cart', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          });
     }

     return (<>
          <div className={styles.cart_container}>
               {cartItems.length === 0 ? <div className={styles.flex1}>
                    <div className={styles.emptyContainer}>
                         <p className={styles.empty}>Your Cart is Empty....</p>
                         <img src="https://cdn-icons-png.flaticon.com/128/10575/10575628.png" />
                    </div>
                    <Link to="/" className={styles.link}><Shopping /></Link>
               </div>
                    :
                    <>
                         <Link to="/" id={styles.cartShopping} className={styles.link}><Shopping /></Link>
                         <table >
                              <thead>
                                   <tr>
                                        <th>Item</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Remove</th>
                                        <th>Total</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {cartItems.map((item, i) =>
                                        <tr key={i} >
                                             <td><img className={styles.image} src={item.image} /></td>
                                             <td>{item.title}</td>
                                             <td>₹{item.price}</td>
                                             <td><span onClick={() => { dispatch(decreaseQty(item.id)) }}>-</span>
                                                  {item.qty}
                                                  <span onClick={() => { dispatch(increaseQty(item.id)) }}>+</span></td>
                                             <td><FontAwesomeIcon className={styles.fa_trash_can} onClick={() => { handleDelete(item) }} icon={faTrashCan} /></td>
                                             <td>₹{item.price * item.qty}</td>
                                        </tr>
                                   )}
                              </tbody>
                              <br />
                              <tfoot>
                                   <tr className="border">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <th>Total:</th>
                                        <td>₹{totalAmount()}</td>
                                   </tr>
                              </tfoot>
                         </table>
                    </>
               }
          </div>
          <ToastContainer />
     </>
     );
}

