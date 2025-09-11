import React, { useState, useEffect } from 'react';
import { Button, Spinner, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { paymentSuccess, paymentCanceled } from '../actions/checkout.actions';
import { useLocation } from 'react-router-dom';


const PaymentStatus = () => {
    const dispatch = useDispatch();
    const [checkoutMessage, setCheckoutMessage] = useState("");
    const location = useLocation();
    const {bookingStatus,dealId} = location.state || {};
    useEffect(() => {

        if (bookingStatus=="success") {
            //dispatch(paymentSuccess(JSON.parse(localStorage.getItem("dealId"))));
            dispatch(paymentSuccess(dealId))
            setCheckoutMessage("Booking confirmed 😇 !!")
        }

        if (bookingStatus=="cancelled") {
            //dispatch(paymentCanceled(JSON.parse(localStorage.getItem("dealId"))));
            dispatch(paymentCanceled(dealId))
            setCheckoutMessage("Failed to book the venue 😥 !!")
        }
        //localStorage.removeItem("dealId");
    }, [checkoutMessage])

    return (
        <Container className="text-center" style={{ marginTop: "80px" }}>
            {
                checkoutMessage === "Booking confirmed 😇 !!" ?
                    <h2 style={{ color: 'green' }}>{checkoutMessage}</h2>
                    :
                    <h2 style={{ color: 'red' }}>{checkoutMessage}</h2>
            }

            <Link to={'/'} className="btn btn-primary">🏡 Home Page</Link>
        </Container>
    )
}

export {
    PaymentStatus
}