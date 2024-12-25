import { useState } from 'react';
import './ProductList.css'
import products from './assets/products';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductList({ onClose }) {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const cartItems = useSelector(state => state.cart.items); // Add this line to get cart items

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
           ...prevState,
           [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
         }));
      };
    const styleObj = {
        backgroundColor: '#417043',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
    }
    const title = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(!showPlants); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);  // Add this line

    const isItemInCart = (productName) => {
        return cartItems.some(item => item.name === productName);
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <div onClick={onClose} style={{cursor:'pointer'}} className="close-button">
                            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        </div>
                        <div onClick={onClose} style={{cursor:'pointer'}}>
                            <div>
                                <h3 style={{ color: 'white', marginLeft:13,}}>Jakes Paradise Nursery</h3>
                                <i style={{ color: 'white', marginLeft:13, }}>Where nature meets tranquility</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={title}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={title}>
                        {totalQuantity > 0 ?<div className="cart-badge">{totalQuantity}</div> : null}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                            <rect width="156" height="156" fill="none"></rect>
                            <circle cx="80" cy="216" r="12"></circle>
                            <circle cx="184" cy="216" r="12"></circle>
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                        </svg>
                    </a></div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {products.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-price">{plant.cost}</div>
                                        <button 
                                            className={`product-button ${isItemInCart(plant.name) ? 'in-cart' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={isItemInCart(plant.name)}
                                        >
                                            {isItemInCart(plant.name) ? 'In Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

) : (
    <div className="checkout-items">
        <CartItem onContinueShopping={handleContinueShopping} />
        <div className="checkout-actions">
            <button 
                className="checkout-button continue-shopping" 
                onClick={handlePlantsClick}
            >
                Continue Shopping
            </button>
            <button 
                className="checkout-button checkout" 
                onClick={() => toast.info('Checkout feature coming soon! 🛍️')}
            >
                Checkout
            </button>
        </div>
    </div>
            )}
        </div>
    );
}

export default ProductList;
