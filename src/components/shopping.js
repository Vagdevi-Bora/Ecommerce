import styles from "../styles/shopping.module.css";

export default function Shopping() {
    return (
        <div className={styles.flex}>
            <img src="https://cdn-icons-png.flaticon.com/128/11502/11502534.png" className={styles.symbol} />
            <h2 className={styles.shopping}>Continue Shopping</h2>
        </div>
    )
}