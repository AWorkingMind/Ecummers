import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Tooltip } from "@material-tailwind/react";
import { removeFromCart, updateCartItemQuantity, processCheckout } from "../../features/slices/cartSlice"; // Sørg for at importere processCheckout her

const Cart = ({ openModal, setOpen }) => {
    const { cart, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleQuantityChange = (item, delta) => {
        const newQuantity = item.amount + delta;
        if (newQuantity > 0) {
            dispatch(updateCartItemQuantity({ ...item, amount: newQuantity }));
        } else {
            dispatch(removeFromCart({ id: item.id }));
        }
    };

    const handleCheckout = () => {
        dispatch(processCheckout()); // Dispatch processCheckout thunk når checkout-knappen klikkes
        setOpen(false); // Lukker dialogen efter checkout
        navigate('/admin');
    };

    return (
        <div className="flex flex-col">
            {cart.length > 0 ? (
                <Fragment>
                    <Dialog open={openModal} handler={() => setOpen(false)}>
                        <DialogHeader>Shopping Bag</DialogHeader>
                        <DialogBody divider className="flex-col flex">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center my-2">
                                    <div className="flex items-center">
                                        <img src={item.img} alt={item.name} className="w-20 h-20 object-cover" />
                                        <div className="ml-4">
                                            <p>{item.name}</p>
                                            <p>Price: {item.price}$</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button onClick={() => handleQuantityChange(item, -1)} color="red">-</Button>
                                        <span className="mx-2"> {item.amount} </span>
                                        <Button onClick={() => handleQuantityChange(item, 1)} color="green">+</Button>
                                    </div>
                                    <div>
                                        <Tooltip content="Remove from the Cart" placement="bottom">
                                            <Button onClick={() => dispatch(removeFromCart({id: item.id}))} color="red">
                                                Remove
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </DialogBody>
                        <DialogFooter>
                            <div className="flex justify-between w-full items-center">
                                <p>Total Price: {totalPrice.toFixed(2)}$</p>
                                <Button onClick={handleCheckout} color="green">Checkout</Button>
                            </div>
                        </DialogFooter>
                    </Dialog>
                </Fragment>
            ) : (
                <Fragment>
                    <Dialog open={openModal} handler={() => setOpen(false)}>
                        <DialogHeader>Shopping Bag</DialogHeader>
                        <DialogBody>
                            <p>Your cart is empty.</p>
                        </DialogBody>
                        <DialogFooter>
                            <Button onClick={() => setOpen(false)} color="blue">Close</Button>
                        </DialogFooter>
                    </Dialog>
                </Fragment>
            )}
        </div>
    );
};

export default Cart;