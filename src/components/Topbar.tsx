function Topbar() {
  return (
    <div className="bg-black text-white py-6 mb-6">
        <div className="p-4 container mx-auto">
            <div className='flex justify-between items-center text-center'>
                <span className="font-extrabold text-2xl">ArticHub</span>
                <div className="flex cursor-pointer">
                    <span className="text-sm text-green-300 font-semibold">Srirag Hariharan</span>
                    <span className="text-sm text-gray-400 ml-2">|</span>
                    <span className="text-sm text-red-400 ml-2">Logout</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar