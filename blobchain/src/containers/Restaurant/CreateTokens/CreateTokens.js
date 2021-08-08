import './CreateTokens.css';
import { withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
class CreateTokens extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaxChange = this.handlePaxChange.bind(this);
        this.handleTableNumChange = this.handleTableNumChange.bind(this);
        this.createTokenHandler = this.createTokenHandler.bind(this);
    }
    handleChange = (e) =>{
        this.setState({
            startDate: e,
        })
    }

    handleTableNumChange = (e) =>{
        if(e.target.value >= 0)
        this.setState({
            tableNum: e.target.value,
        })
    }

    handlePaxChange = (e) =>{
        if(e.target.value >= 1)
            this.setState({
                pax: e.target.value,
            })
    }

    state = {
        startDate: new Date(),
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

    createTokenHandler = () => {
       if(this.state.startDate && this.state.pax && this.state.tableNum){
        var unixTime = this.state.startDate.getTime();
       }
    }

    render(){
    return (
        <div>
            <div className="restaurantName">{this.props.name}</div>
            <br></br>
            <div className="chooseDateTitle">Choose Date:</div>
            <ReactDatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            startDate={this.state.startDate}
            withPortal
            showTimeSelect
            dateFormat="P , h:mm aa"
            filterTime={this.filterPassedTime}
            />
            <div className="chooseDateTitle">
                Table No:  <input type="number" min="0" onChange={this.handleTableNumChange}/>
            </div>
            <div className="chooseDateTitle">
                Pax:  <input type="number" min="1" onChange={this.handlePaxChange}/>
            </div>
            
            <button className="buttonCreateToken" onClick={()=>this.createTokenHandler()}>Create Token</button>
        </div>
      );
}
 
}


const mapStateToProps = (state) => {
    
    return{
        name: state.getUserDataReducer.displayName,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        reviews:state.getReviewsReducer.reviews,
        
    }
}

export default connect(mapStateToProps)(withRouter(CreateTokens));
