import { useEffect, useState } from 'react';
import { actions } from '../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/allProducts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import { addCart, localCart } from '../redux/cartReducer';
import { cartSelector, increaseQty } from '../redux/cartReducer';
import Rating from './rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sort(props) {
  const item = props.item;

  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(item.rating);
  const [price, setPrice] = useState('');
  const [about, setAbout] = useState('');
  const [edited, setEdited] = useState(false);


  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart.length === 0) {
      const localData = JSON.parse(localStorage.getItem('cartData')) || [];
      dispatch(localCart(localData));
    }
  }, []);

  // add item to cart 
  const addToCart = (item) => {
    let product = cart?.find((p) => p.id === item.id);
    if (!product) {
      dispatch(addCart(item));
      window.localStorage.setItem("cartData", JSON.stringify([...cart, item]));
    } else {
      dispatch(increaseQty(item.id));
    }

  }

  // delete item from ecommerce
  const handleDelete = (item) => {
    dispatch(actions.deleted(item.id));
  }

  const handleSave = (item) => {
    setEdited(false);
    toast.success('item updated', {
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


  return (

    <>
      <div className={styles.flex} >
        <img className={styles.item} alt="item" src={item.image} />
        <div className={styles.flexColumn}>
          <input
            type='text'
            defaultValue={item.title}
            onChange={(e) => { setTitle(e.target.value) }}
            disabled={(edited === true) ? false : true}
            className={`title ${edited ? "outline" : ''}`}
          />
          <input
            type="text"
            defaultValue={item.price}
            onChange={(e) => { setPrice(e.target.value) }}
            disabled={(edited === true) ? false : true}
            className={`price ${edited ? "outline" : ''}`}
          />
          <div>
            {edited === false ?
              <Rating stars={rating} /> :
              <input
                type='number'
                max="5"
                min="1"
                defaultValue={item.rating}
                onChange={(e) => { setRating(e.target.value) }}
                disabled={(edited === true) ? false : true}
                className={`rating ${(edited === true) ? "outline" : ''}`}
              />}

          </div>
        </div>
        <div >
          <textarea
            defaultValue={item.about}
            maxLength="80"
            onChange={(e) => { setAbout(e.target.value) }}
            disabled={(edited === true) ? false : true}
            className={` about ${edited ? "outline" : ''}`}
          />

          <div className={styles.actions}>
            {edited === true ? <button type="submit" onClick={() => handleSave(item)} id={styles.green}>Save</button> :
              <FontAwesomeIcon onClick={() => setEdited(true)} className={styles.fa_pen} icon={faPen} />
            }
            <span ><FontAwesomeIcon onClick={() => { handleDelete(item) }} className={styles.fa_trash_can} icon={faTrashCan} /></span>
            <Link to="/add-to-cart">
              <button type="submit" id='button' onClick={() => addToCart(item)}>Add To Cart</button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}