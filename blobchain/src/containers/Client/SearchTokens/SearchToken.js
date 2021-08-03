import './SearchTokens.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { getSlots } from '../../../store/actions';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class SearchTokens extends Component {
    
    constructor(props){
        super(props);
        this.props.dispatch(getSlots(props.match.params.addr,false));
    }

    state = {
        startDate: new Date(),
    };
    
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
    render(){
    const { startDate } = this.state;
    return (
        <div>
            <div>{this.props.match.params.name}</div>
            <br></br>
            <div>{this.props.match.params.addr}</div>
            <br></br>
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
                            return <div key={i}>{slot.token.dateTime}
                                <button>Apply</button>
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
    console.log(state);
    return{
        name: state.getUserDataReducer.name,
        pubAddr: state.getUserDataReducer.pubAddr,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        slots:state.getSlotsReducer,
    }
}

export default connect(mapStateToProps)(withRouter(SearchTokens));
