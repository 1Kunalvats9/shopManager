import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState(null); 
  const router = useNavigate();
  const [totalProducts, settotalProducts] = useState(0)
  const [totalRevenue, settotalRevenue] = useState(0)
  const [dailyCustomer, setdailyCustomer] = useState(0)
  const [editProduct, setEditProduct] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [monthlySales, setmonthlySales] = useState(0)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [isSearching, setisSearching] = useState(false)
  const [searchFor, setsearchFor] = useState(" ")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router("/login"); 
    } else {
      setUser({ loggedIn: true });
    }
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail); 
    }
    
  }, []);

  

  useEffect(() => {
    if (!email) return; 

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://shopmanagerback.onrender.com/api/inventory/inventoryget", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.data); // ✅ Set the fetched products to state
        settotalProducts(data.data.length)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchInventoryData = async ()=>{

      try{
        const email = localStorage.getItem('email')
        if(!email){return}
        let res = await fetch('https://shopmanagerback.onrender.com/api/inventory/inventory-data',{
          method:'POST',
          body:JSON.stringify({email}),
          headers: { "Content-Type": "application/json" }
        })
        if(!res.ok) alert("error in fetching data from inventory");
        const inventoryData = await res.json()
        console.log("inventory data from backend:", inventoryData); 
        settotalProducts(inventoryData.totalProducts)
  
      }catch(err){
        console.log("error in inventorydata",err)
        alert(err)
      }
    }
    
    fetchProducts();
    // fetchInventoryData();
  }, [email]); 

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("https://shopmanagerback.onrender.com/api/inventory/update-product", {
        method: "PUT",
        body: JSON.stringify(editProduct),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update product");

      setShowEditModal(false);
      setProducts((prev) =>
        prev.map((item) => (item._id === editProduct._id ? editProduct : item))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch("https://shopmanagerback.onrender.com/api/inventory/delete-product", {
        method: "DELETE",
        body: JSON.stringify({ id: productId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((item) => item._id !== productId));
      toast.success('Item deleted Succesfully.')
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* <BackButton class="fixed md:top-26 md:left-4 top-18 left-6" /> */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8 md:mt-0 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-6 w-6 text-indigo-600">
                  <path d="m7.5 4.27 9 5.15"></path>
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7 8.7 5 8.7-5"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt><dd className="text-lg font-semibold text-gray-900">{totalProducts}</dd></dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-6 w-6 text-green-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Daily Customers</dt><dd className="text-lg font-semibold text-gray-900">{dailyCustomer}</dd></dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart3 h-6 w-6 text-blue-600"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
              </div>
              <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Monthly Sales</dt><dd className="text-lg font-semibold text-gray-900">{monthlySales}</dd></dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" height="32" width="20" viewBox="0 0 320 512"><path fill="#CA8A03" d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z"/></svg>
              </div>
              <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt><dd className="text-lg font-semibold text-gray-900">{totalRevenue}</dd></dl>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 bg-white mt-6 rounded-xl sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Product Management</h3>
          <div className="flex items-center gap-4">
            <button className="flex cursor-pointer items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" onClick={()=>{router("/sell-products")}}>
              Sell
            </button>
            <button onClick={()=>{router("/add-products")}} className="flex cursor-pointer items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-5 w-5 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path>
              </svg>Add Product</button>
          </div>
          </div>
          <div className="overflow-x-scroll">
            <div className="w-full flex items-center justify-start flex-col">
              <input onClick={()=>setisSearching(!isSearching)} type="text" placeholder="Search for products" className={`w-[99%] ${isSearching ? '':'rounded-b-lg'} px-3 py-1 rounded-t-lg outline-none border-2 border-gray-200 mx-3`} onChange={(e)=>{setsearchFor(e.target.value)}}/>
              <div className={`w-[99%] border-2 flex-col border-gray-200 ${isSearching && searchFor.length!==0 ? "flex border-t-0":"hidden"} text-black rounded-b-lg`}>
                {
                  products && products
                  .filter(ele => ele.name?.toLowerCase().startsWith(searchFor.toLowerCase()))
                  .map((item, idx) => (
                    <h1 className="text-lg px-3 py-1 hover:bg-gray-200 cursor-pointer" key={idx}>{item.name}</h1>
                  ))
                }
              </div>
            </div>
            <table className="min-w-full divide-y mt-6 divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retail Price</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesale Price</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products && products.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap flex justify-start items-center gap-5 text-black"><img src={item.url} className="w-8" alt={item.name} /> {item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{item.retailPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{item.wholesalePrice}</td>
                    <td className=" flex -translate-y-2  items-center gap-3">
                    <svg onClick={() => handleEdit(item)} className="cursor-pointer hover:scale-110 duration-150" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    <svg className="cursor-pointer hover:scale-110 duration-150" onClick={() => handleDelete(item._id)} xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#f46262" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                  </td>

                  </tr>
                ))}
              </tbody>
            </table>
            {products && products.length === 0 && <p className="text-gray-500 mt-4">No products found.</p>}
          </div>
        </div>
        {showEditModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 backdrop-blur-md">
              <div className="bg-[#e7e4e4] border-4 border-indigo-800 p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-[#4F39F6] mb-4">Edit Product</h2>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="border-2 border-black rounded-md p-2 w-full mb-2"
                />
                <input
                  type="number"
                  value={editProduct.quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                  className="border-2 border-black rounded-md p-2 w-full mb-2"
                />
                <input
                  type="number"
                  value={editProduct.retailPrice}
                  onChange={(e) => setEditProduct({ ...editProduct, retailPrice: e.target.value })}
                  className="border-2 border-black rounded-md p-2 w-full mb-2"
                />
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                <button onClick={() => setShowEditModal(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Page;
