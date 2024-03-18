import { fetchProducts } from "../redux/Products/action";

export const checkToken = () => {
    const jwt = localStorage.getItem('userdata');
    if (!jwt) {
        window.location.href = './Login'
    } else {
        fetchProducts()

    }
};






export const getuserId = async () => {
    try {
        const response = await fetch('http://localhost:2000/user');
        
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const users = await response.json();
        if (users.length === 0) {
            throw new Error('No user found');
        }
        const userId = users[0]._id;
        return userId;
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return null;
    }
};




export const handleLogout = () => {
    localStorage.removeItem('userdata')
    window.location.href = './Login';
    sessionStorage.removeItem('cartId')
};


export const removeFromCart = async (userId, productId) => {
    try {
        const response = await fetch(`http://localhost:2000/cart/remove_from_cart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, productId })
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Product removed successfully');
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};