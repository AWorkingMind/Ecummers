// AdminDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const { totalEarnings, totalSold } = useSelector(state => state.admin);

    return (
        <div className="admin-dashboard justify-center">

            <div className="grid grid-cols-1 text-center pt-5 pb-5">
                <h1 className="text-cyan-600 font-bold text-size">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-2">

                <div className="justify-center ml-20 mr-20 bg-light-green-300 rounded-2xl h-40">
                    <p className="ml-8 mt-5 font-small text-light-green-700 font-bold">Total Sold Items: <br/><p className="pt-2 font-even-smaler">{totalSold}</p></p>
                </div>

                <div className="justify-center mr-20 ml-20 bg-light-blue-200 rounded-2xl h-40 ">
                 <p className="ml-8 mt-5 font-small font-bold text-cyan-900"> Total Earnings:<br/> <p className="pt-2 font-even-smaler">${totalEarnings.toFixed(2)}</p></p>
                </div>
            </div>
            <Link to="/" className="text-gray-800 hover:underline text-center justify-center">◄ Back to Home</Link>
        </div>
    );
}

export default AdminDashboard;