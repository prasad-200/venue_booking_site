import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { isEmpty } from '../../helpers/isObjEmpty';
import { useDispatch } from 'react-redux';
import { paymentCanceled } from '../../actions/checkout.actions';
import { deleteDealConstants } from '../../actions/constants';
import axios from '../../helpers/axios';
import  { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const DealsHistory = (props) => {
    const dispatch = useDispatch();
    const handleDelete = async (dealId) =>{
    
        try {
            console.log("clicked");
             dispatch({
                    type: deleteDealConstants.DELETE_DEAL_SUCCESS,
                    payload: dealId
                })
            const res = await axios.delete(`delete-unconfirmDeal/${dealId}`);
            if (res.status >=200 && res.status <300) {
                // dispatch({
                //     type: deleteDealConstants.DELETE_DEAL_SUCCESS,
                //     payload: dealId
                // })
                console.log("deleted");
            }
        } catch (error) {
          console.log(error)
        }
    }
      

    return (
        <div className="card-body">
            <h4>Last few bookings</h4>
            {
                isEmpty(props.allDeals) ?
                    <h5 className = "text-muted" >
                        {
                            props.role === 'client' ?
                                `You didn't booked any venues`
                                :
                                `Currently you don't have any bookings`
                        }
                    </h5>
                    :
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Deal Date</th>
                                <th>Venue Name</th>
                                <th>Event Date</th>
                                {
                                    props.role === 'dealer' ?
                                        <th>Per deal revenue</th> : <th>Bill per deal</th>
                                }
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.allDeals.map((deal) => {
                                    console.log(deal);
                                    const { date_added, venueName, eventDate, bill} = deal;
                                    return (
                                         <tr key={deal._id}>
                                            <td>{date_added}</td>
                                            <td>{venueName}</td>
                                            <td>{eventDate}</td>
                                            <td>{bill}</td>
                                            <td>
                                                  <Link to={`/venue/${deal.venueId}`}> 
                                                <Button size="sm">Details</Button>
                                                  </Link>
                                            </td>
                                            <td>
                                                <Button style={{background:"red"}}size="sm" onClick={(e)=>{e.stopPropagation();handleDelete(deal?._id)}}><Delete/></Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
            }

        </div>
    )
}

export { DealsHistory }
