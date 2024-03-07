import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-around items-center bg-gray-900">

          <div>
            <Link to="/">
            <img  className="h-28 w-full"></img>
            </Link>
          </div>

          <div className="flex flex-row items-center">
              <div className="flex flex-row items-center cursor-pointer" onClick={handleOpen}>
                {totalAmount > 0 ? (
                  <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
                    {totalAmount}
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    className="w-7 h-7 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                )}

                <p className=" font-inter text-base font-medium tracking-normal leading-none text-center text-white">
                  Shopping bag
                </p>
                <div>
                  {open && <Cart openModal={open} setOpen={setOpen}></Cart>}
                </div>
              </div>

          </div>

      </div>
    </>
  );
};

export default Navbar;
