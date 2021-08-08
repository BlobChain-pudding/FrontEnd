import './RestaurantReservations.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { getSlots } from '../../../store/actions';
import { connectBlob } from '../../../modules/blockchain';
class RestaurantReservations extends Component {
    
    constructor(props){
        super(props);
        connectBlob().then((currentAccount)=>{
            this.props.dispatch(getSlots(currentAccount,true));
        });
    }

    state = {
        startDate: new Date(),
    };
    
    handleChange = (startDate) => {
        this.setState({
          startDate,
        });
      };

    dateConverter = (UNIX_timestamp) => {
        var unixDate = new Date(parseInt(UNIX_timestamp,10));
        return unixDate.toLocaleString('en-SG', {timeZone: 'Asia/Singapore',year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"numeric", hour12: true });    
     }

    render(){
    return (
        <div>
            
            <div className="restaurantName">{this.props.name}</div>
            <br></br>
            {
                this.props.slots ? (Object.keys(this.props.slots).map((date)=>{
                    if(date !== "success"){
                        return (this.props.slots[date].map((req,i)=>{
                            if(req.token.accepted){
                                return <div className="Token" key={i}>
                                <div className="restaurantName">{req.token.restaurantName}</div>
                                <div className="restaurantAddress">{req.token.restaurantAddress}</div>
                                <div className="TokenDateTime">{this.dateConverter(req.token.dateTime)}</div>
                                <div className="TokenDesc">
                                <div className="TokenTableNo">Table {req.token.tableNo}</div>
                                <div className="TokenPax">PAX: {req.token.pax}</div>
                                </div>
                                <div className="TokenRequestState">{req.token.accepted ? "APPROVED":""}</div> 
                            </div>
                            }
                            return null;
                            
                        }))
                    }
                    return null;
                })) : null 
            }
        </div>
      );
    }
 
}


const mapStateToProps = (state) => {
    
    return{
        name: state.getUserDataReducer.displayName,
        UID:state.getUserDataReducer.uid,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        slots:state.getSlotsReducer.slots,
    }
}

export default connect(mapStateToProps)(withRouter(RestaurantReservations));
