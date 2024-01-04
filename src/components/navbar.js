import { Link, Outlet } from "react-router-dom";
import styles from "../styles/navbar.module.css"
import { useSelector } from "react-redux";


export default function Navbar() {

  const totalProducts = useSelector((state) => state.cartReducer.noOfItems);

  return (
    <>
      <div className={styles.nav_container}>
        <h2>E-COMMERCE</h2>
        <Link to='/add-a-product' className="ecom-nav"><h3>Add a Product</h3></Link>
        <Link to="/add-to-cart">
          <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png" alt="cart" />
        </Link>
        <p className={styles.count}>{totalProducts}</p>
      </div>
      <Outlet />
    </>
  );
}
