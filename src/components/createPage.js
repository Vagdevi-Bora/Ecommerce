import styles from "../styles/createPage.module.css";
import { pdtSelector } from "../redux/productReducer";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/productReducer";
import { Link } from "react-router-dom";
import Shopping from "./shopping";

export default function CreatePage() {
    const data = useSelector(pdtSelector);
    const dispatch = useDispatch();

    const items = [...data];

    // get input data from users 
    const addNewProduct = () => {
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const about = document.getElementById("about").value;
        const url = document.getElementById("img-url").value;
        const rating = document.getElementById("rating").value;
        const length = data.length;
        const index = data[length - 1].id;

        const newItem = {
            id: index + 1,
            title: name,
            price: price,
            rating: rating,
            qty: 1,
            image: url,
            about: about,
            able: false
        }
        items.push(newItem);
        dispatch(actions.addNew(items));
    }

    return (
        <>
            <div className={styles.container}>
                <Link to="/" className={styles.link}><Shopping /></Link>
                <input type="text" placeholder="Name" id="name" autoFocus></input>
                <input type="text" placeholder="Price" id="price"></input>
                <input type="text" placeholder="description" id="about"></input>
                <input type="url" placeholder="img url" id="img-url"></input>
                <input type="text" placeholder="rating" id="rating"></input>
                <Link to="/"> <button type="submit" onClick={addNewProduct} className={styles.add}>Add</button></Link>
            </div>
        </>
    );

}