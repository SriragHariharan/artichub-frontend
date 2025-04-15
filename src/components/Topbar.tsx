import { Link, useNavigate } from "react-router";

function Topbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('ahub-token');
    navigate("/login")
  }
  return (
    <div className="bg-black text-white py-6 mb-6">
        <div className="py-2 px-4 container mx-auto">
            <div className='flex justify-between items-center text-center'>
                <Link to="/" className="font-extrabold text-2xl">ArticHub</Link>
                <div className="flex cursor-pointer">
                    <Link to="/account" className="text-sm text-green-300 font-semibold">Account</Link>
                    <span className="text-sm text-gray-400 ml-2">|</span>
                    <Link to="/mine" className="text-sm text-amber-400 ml-2">Mine</Link>
                    <span className="text-sm text-gray-400 ml-2">|</span>
                    <span onClick={handleLogout} className="text-sm text-red-400 ml-2">Logout</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar