import { useEffect, useState } from 'react';
import { actions, getInitialStateAsync } from '../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/allProducts.module.css";
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Sort from './sorted';

export function AllProducts() {

  const [toggle, setToggle] = useState(false);

  const data = useSelector((state) => state.pdtReducer.products);
  const sortedData = useSelector((state) => state.pdtReducer.sortedData);
  const dispatch = useDispatch();
  let newData = [];

  // get data when first time render 
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getInitialStateAsync());
    }
  }, []);

  // add "able" key value to the array 
  useEffect(() => {
    data.forEach((item, i) => {
      const n = { ...item }
      Object.assign(n, { able: false });
      newData[i] = n;
    })
    dispatch(actions.addNew(newData));
  }, [data[1]?.hasOwnProperty("able")])

  useEffect(() => {
    if (toggle) {
      dispatch(actions.sortedProducts());
    }
  }, [toggle])

  return (
    <>
      <Navbar />
      <div className={styles.filter}>
        {toggle ?
          <div className={styles.range}>
            <img onClick={() => { setToggle(false) }} src="https://cdn-icons-png.flaticon.com/128/6134/6134042.png" />
          </div>
          : <>
            <img onClick={() => { setToggle(true) }} src="https://cdn-icons-png.flaticon.com/128/2977/2977956.png" />
            <h3 onClick={() => { setToggle(true) }}>Filter</h3></>}
      </div>
      <Link to="/">
        <div className={styles.products_container}>
          {toggle === false ?
            data?.map((item) => (<Sort key={item.id} item={item} />))
            : sortedData.map((item) => (<Sort key={item.id} item={item} />))}
        </div>
      </Link>
    </>
  );
} 