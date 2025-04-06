import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { LuScanLine } from "react-icons/lu";
const AddProducts = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [retailPrice, setRetailPrice] = useState(0)
    const [wholesalePrice, setWholesalePrice] = useState(0)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("")
    const navigate = useNavigate()
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
        setLoading(true); // Start loading
    
        try {
            const res = await fetch("https://shopmanagerback.onrender.com/api/upload/upload-file", {
                method: "POST",
                body: formData,
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Upload error:", errorData.error);
                toast.error("Image upload failed ❌");
                setLoading(false);
                return;
            }
    
            const data = await res.json();
            setUrl(data.url);
            toast.success("Image uploaded ✅");
        } catch (err) {
            console.error("❌ Upload failed:", err.message);
            toast.error("Image upload error");
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (loading) {
            toast.error("Image is still uploading, please wait...");
            return;
        }
        if (!url) {
            toast.error("Please upload an image first.");
            return;
        }
    
        try {
            const email = localStorage.getItem("email");
            const res = await fetch("https://shopmanagerback.onrender.com/api/inventory/inventoryput", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, category, quantity, retailPrice, wholesalePrice, url }),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to add product");
            }
    
            const data = await res.json();
            toast.success("Product added Successfully ✅");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (err) {
            console.error("❌ Error adding product:", err.message);
            toast.error("Failed to add product");
        }
    };
    
    return (
        <div className='w-[100vw] h-[100vh] bg-[#F3F4F6] flex items-center justify-center'>
            <div className="bg-white rounded-lg border-2 border-gray-300 p-6 max-w-md w-full">
                <h3 className="text-xl md:text-3xl font-medium text-white bg-indigo-700 px-3 py-2 rounded-md mb-4">Add New Product <div className='text-sm mt-3'>or scan barcode</div></h3>
                
                <form onSubmit={handleClick}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-md font-medium text-gray-700">Product Name</label>
                            <input type="text" id="name" placeholder='Name' className="mt-1 block w-full rounded-sm border-2 border-gray-300 focus:border-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select id="category" className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setCategory(e.target.value); }} >
                                <option value="Furniture">Furniture</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Home and Kitchen">Home and Kitchen</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Food">Food</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Electronics">Electronics</option>
                            </select>

                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" id="quantity" placeholder='Quantity' className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setQuantity(e.target.value); }} />
                        </div>
                        <div>
                            <label htmlFor="retailPrice" className="block text-sm font-medium text-gray-700">Retail Price (₹)</label>
                            <input type="number" id="retailPrice" placeholder='Retail price' className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setRetailPrice(e.target.value); }} />
                        </div>
                        <div>
                            <label htmlFor="wholesalePrice" className="block text-sm font-medium text-gray-700">Wholesale Price (₹)</label>
                            <input type="number" id="wholesalePrice" placeholder='Wholesale Price' className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1"
                                onChange={(e) => { setWholesalePrice(e.target.value); }} />
                        </div>
                        <div>
                            <input type="file" placeholder='Upload Image' className='px-3 py-1 border-2 rounded-md w-full border-gray-200 cursor-pointer' onChange={handleUpload} />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => {
                            navigate("/dashboard")
                        }}>Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">{loading ? 'Uploading...' : 'Add Product'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;