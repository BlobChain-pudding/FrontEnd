import './SearchTokens.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { getSlots, makeRequest } from '../../../store/actions';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class SearchTokens extends Component {
    
    constructor(props){
        super(props);
        this.props.dispatch(getSlots(props.match.params.addr,"unaccepted"));
        this.goBack = this.goBack.bind(this);
    }

    state = {
        startDate: new Date(),
    };

    goBack(){
        this.props.history.goBack();
    }
    
    
    handleChange = (startDate) => {
        this.setState({
          startDate,
        });
      };

    filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    }
    dateConverter = (UNIX_timestamp) => {
        var unixDate = new Date(parseInt(UNIX_timestamp,10));
        return unixDate.toLocaleString('en-SG', {timeZone: 'Asia/Singapore',year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"numeric", hour12: true });    
     }

    render(){
    const { startDate } = this.state;
    return (
        <div>
            <button onClick={this.goBack}>Go Back</button>
            <div className="restaurantName">{this.props.match.params.name}</div>
            <div className="restaurantAddress">{this.props.match.params.addr}</div>
            <br></br>
            <div className="chooseDateTitle">Choose Date:</div>
            <ReactDatePicker
            selected={startDate}
            onChange={this.handleChange}
            startDate={startDate}
            withPortal
            dateFormat="P"
            // filterTime={this.filterPassedTime}
            />
            {
                this.props.slots ? (Object.keys(this.props.slots).map((date)=>{
                    if(this.state.startDate.toDateString() === date){
                        return (this.props.slots[date].map((slot,i)=>{
                            return <div className="Token" key={i}>
                                <div className="restaurantName">{slot.token.restaurantName}</div>
                                <div className="restaurantAddress">{slot.token.restaurantAddress}</div>
                                <div className="TokenDateTime">{this.dateConverter(slot.token.dateTime)}</div>
                                <div className="TokenDesc">
                                <div className="TokenPax">PAX: {slot.token.pax}</div>
                                <div className="TokenTableNo">Table {slot.token.tableNo}</div>
                                </div>
                                <button className="buttonApply" onClick={()=>{this.props.dispatch(makeRequest(slot.token.restaurantAddress, slot.hash))}}>Apply</button>
                            </div>
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
        name: state.getUserDataReducer.name,
        pubAddr: state.getUserDataReducer.pubAddr,
        UID: state.getUserDataReducer.UID,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        slots:state.getSlotsReducer.slots,
    }
}

export default connect(mapStateToProps)(withRouter(SearchTokens));
