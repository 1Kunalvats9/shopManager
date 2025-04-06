import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const SellProducts = () => {
    const router = useNavigate();
    const [isSearching, setisSearching] = useState(false);
    const [searchFor, setsearchFor] = useState("");
    const [products, setProducts] = useState([]);
    const [amount, setamount] = useState('');
    const [currVal, setcurrVal] = useState(null);
    const [cart, setcart] = useState([]);
    const [customerPhone, setcustomerPhone] = useState('')
    const handleDelete = (id) => {
        setcart(cart.filter((item) => item.id !== id));
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const email = localStorage.getItem("email");
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://shopmanagerback.onrender.com/api/inventory/inventoryget", {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: { "Content-Type": "application/json" },
                });
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const sendBill = async () => {
        const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const formattedProducts = cart
            .map(item => `${item.quantity} x ${item.name}`)
            .join('\n');
    
        const billDetails = `
    Product: \n${formattedProducts}
    Total: ₹${totalPrice}
    Thank you for shopping with us!
        `;
    
        try {
            const res = await fetch('https://shopmanagerback.onrender.com/api/sms/send', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: customerPhone, billDetails }),
            });
    
            let data = {};
            try {
                data = await res.json();
            } catch (e) {
                console.error("❌ Failed to parse JSON from sendBill response", e.message);
            }
    
            if (res.ok && data.success) {
                toast.success("E-bill sent successfully ✅");
            } else {
                toast.error("Failed to send e-bill ❌");
            }
        } catch (error) {
            console.error("❌ sendBill failed:", error.message);
            toast.error("Could not send bill");
        }
    };
    
    const handleCheckout = async () => {
        try {
            await sendBill();
            const res = await fetch("https://shopmanagerback.onrender.com/api/checkout/checkout-product", {
                method: "POST",
                body: JSON.stringify({ cart }),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Checkout Successful!");
                setcart([]);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Checkout Failed:", error);
        }
    };
  return (
    <div className="w-full min-h-[100vh]">
        <Navbar />
        <div className="w-full h-full flex items-start justify-start">
        <div className="w-[100vw] min-h-[100vh] flex flex-col items-center justify-start">
            <div className="w-full min-h-[94vh] px-10 py-5">
                <div className="overflow-x-scroll">
                    <div className="w-full flex items-start justify-start gap-4 flex-col">
                        <input
                            type="text"
                            placeholder="Search for products"
                            className="w-full border-2 border-gray-100 rounded-md px-5 py-2 outline-none"
                            onClick={() => setisSearching(!isSearching)}
                            onChange={(e) => setsearchFor(e.target.value)}
                        />
                    </div>
                    <div className="flex items-start gap-4 justify-between">
                        <div className="w-full border-2 mt-10 rounded-lg bg-gray-100 border-gray-100 flex flex-wrap gap-5 px-2 py-3">
                            {products && products
                                .filter((ele) => ele.name?.toLowerCase().includes(searchFor.toLowerCase()))
                                .map((item) => (
                                    <div key={item._id} className="flex flex-col w-[19rem] min-h-[20rem] border-2 border-gray-200 bg-white rounded-lg">
                                        <img src={item.url} alt="Product image" className="rounded-lg h-[180px] w-auto object-contain" />
                                        <div className="flex items-start flex-col justify-start gap-4 px-4 py-2">
                                            <h1><span className="font-semibold">Product: </span>{item.name}</h1>
                                            <h1><span className="font-semibold">Category: </span>{item.category}</h1>
                                            <h1><span className="font-semibold">Quantity: </span>{item.quantity}</h1>
                                            <h1><span className="font-semibold">Price: </span>₹{item.retailPrice}</h1>
                                            <div className="flex gap-3 items-center">
                                                <input
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="border-2 w-24 bg-white border-gray-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md px-2 py-1"
                                                    value={currVal === item._id ? String(amount ?? "") : ""}

                                                    onChange={(e) => {
                                                        setcurrVal(item._id);
                                                        setamount(Number(e.target.value) || 0);
                                                    }}
                                                />
                                                <button
                                                    className="hover:bg-[#3d33bc] hover:scale-105 duration-200 bg-[#5046E5] rounded-sm cursor-pointer px-3 py-1 text-white"
                                                    onClick={() => {
                                                        if (currVal === item._id && amount > 0) {
                                                            setcart((prevCart) => [
                                                                ...prevCart,
                                                                { name: item.name, quantity: amount, price: item.retailPrice * amount, id: item._id },
                                                            ]);
                                                            setamount();
                                                        }
                                                    }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {products.length === 0 && <p className="text-gray-500 mt-4">No products found.</p>}
                        </div>

                        {/* Sidebar Cart */}
                        <div className="h-[80vh] w-[20rem] flex items-start justify-center py-9">
                            <div className="w-[95%] relative min-h-full border-2 border-gray-200 rounded-lg px-4 py-2">
                                <h1 className="text-4xl text-center border-b-2 pb-3 border-b-gray-400">Cart</h1>
                                <div className="flex flex-col items-start gap-3 max-h-[60%] px-2 py-4 overflow-y-scroll scrollbar-hide">
                                    {cart.length > 0 ? cart.map((item, idx) => (
                                        <div key={idx} className="w-full flex flex-col items-start gap-2 border rounded-md px-2 py-3">
                                            <h1>{item.name}</h1>
                                            <h1>Quantity: {item.quantity}</h1>
                                            <h1>Price: ₹{item.price}</h1>
                                            <div className='flex items-center gap-2'>
                                                <svg className="cursor-pointer hover:scale-110 duration-150" onClick={() => handleDelete(item.id)} xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#f46262" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                            </div>
                                        </div>
                                    )) : <p>No items</p>}
                                </div>
                                {cart.length > 0 && 
                                    <div className='bottom-2 flex items-center flex-col justify-end gap-4 w-[100%] '>
                                        <input type="text" placeholder='Phone number' onChange={(e)=>{
                                            setcustomerPhone(e.target.value)
                                        }} className='border-2 px-3 py-2 focus:border-indigo-600 max-w-[100%] duration-200 rounded-md' />
                                        <button onClick={handleCheckout} className='hover:bg-[#3d33bc] hover:scale-105 duration-200 bg-[#5046E5] px-3 cursor-pointer py-2 rounded-md text-white'>Checkout</button>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
  )
}

export default SellProducts
