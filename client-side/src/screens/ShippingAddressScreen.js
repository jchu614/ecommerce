import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    //REDIRECT IF NOT SIGNED IN (DEAL WITH LATER)
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, zipcode, country}));
        props.history.push('/payment');
    }
    return (
        <div className="padding">
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName"></label>
                    <input 
                        type="text" 
                        id="fullName" 
                        placeholder="Enter Full Name" 
                        value={fullName} onChange={(e) => setFullName(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address"></label>
                    <input 
                        type="text" 
                        id="address" 
                        placeholder="Enter Address" 
                        value={address} onChange={(e) => setAddress(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="City"></label>
                    <input 
                        type="text" 
                        id="city" 
                        placeholder="Enter City" 
                        value={city} onChange={(e) => setCity(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="zipcode"></label>
                    <input 
                        type="text" 
                        id="zipcode" 
                        placeholder="Enter Zipcode" 
                        value={zipcode} onChange={(e) => setZipcode(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="country"></label>
                    <input 
                        type="text" 
                        id="country" 
                        placeholder="Enter country" 
                        value={country} onChange={(e) => setCountry(e.target.value)} 
                        required
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}