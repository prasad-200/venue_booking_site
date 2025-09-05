import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOneVenue } from '../../actions/venue.actions';
import { getPublicURL } from '../../urlConfig';
import { ImgsCard } from './ImgsCard';
import { useDispatch, useSelector } from 'react-redux';
import BookingModel from './BookingModel';

const VenueCard = (props) => {

    const [bookingModalShow, setBookingModalShow] = useState(false);
    const { img1="https://media.istockphoto.com/id/1184628725/photo/3d-wedding-reception-background-illustration.jpg?s=612x612&w=0&k=20&c=XpFfBNDKM99vaK0N0QkvkvDFNRWIRmJNTkP6qDJbSI8=",
         img2="https://media.istockphoto.com/id/471906412/photo/beautiful-table-setting-for-an-wedding-reception-or-an-event.jpg?s=612x612&w=0&k=20&c=knlIBspy-ZKuQV7bUVr_eclJmyC24ShNAva_Jh9Rwfc=", category, venueName, ownerId, _id, price, location, address, style, isDelete } = props;
    console.log(img1,img2);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const getVenueInfo = () => {
        dispatch(getOneVenue(_id));
    }

    return (
        <div className="card mb-4 box-shadow">
            <ImgsCard
                img1={img1}
                img2={img2}
                alt='venue picture'
                style={style}
            />
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{venueName}</h5>
                    <h5 className="card-title">₹ {price}</h5>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{location}, {address}</h6>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/venue/${_id}`} className="btn-group">
                        <Button variant="primary" size="sm" onClick={getVenueInfo}>Details</Button>{' '}
                    </Link>
                    {
                        isDelete === true ?
                            <Button variant="danger" size="sm">Delete</Button>
                            :
                            auth.user.role === 'dealer' ?
                                <></>
                                :
                                <Button variant="danger" size="sm" onClick={() => setBookingModalShow(true)}>Book</Button>
                    }
                    <BookingModel
                        _id={_id}
                        venueName={venueName}
                        price={price}
                        category={category}
                        address={address}
                        location={location}
                        show={bookingModalShow}
                        ownerId={ownerId}
                        onHide={() => setBookingModalShow(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default VenueCard