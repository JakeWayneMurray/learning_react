import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    console.log("Cart items:", cart); // Log the cart items
    const total = cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')); // Remove '$' and convert to number
      return total + cost * item.quantity;
    }, 0);
    console.log("Total amount:", total); // Log the total amount
    return total;
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
        handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); 
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')); // Remove '$' and convert to number
    return cost * item.quantity; // Calculate total cost for the item
  };

  return (
    <div className="cart-container">
      {calculateTotalAmount() === 0 ? (
        <h2 className="cart-total-amount empty">The cart is empty</h2>
      ) : (
        <h2 className="cart-total-amount">
          Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
        </h2>
      )}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button" 
                  onClick={() => handleDecrement(item)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button" 
                  onClick={() => handleIncrement(item)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;


