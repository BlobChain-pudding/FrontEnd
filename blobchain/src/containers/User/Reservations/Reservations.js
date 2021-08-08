import './Reservations.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import {getReservations } from '../../../store/actions';
import Modal from "react-modal"
import { submitReviews } from './../../../store/actions/userActions';
class Reservations extends Component {
    
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this); 
        this.toggleModal = this.toggleModal.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.selectReviewHandler = this.selectReviewHandler.bind(this);
        this.submitReviewHandler = this.submitReviewHandler.bind(this);
        this.props.dispatch(getReservations(false));
    }
    
    
    state = {
        startDate: new Date(),
        reviewModal:false,
    };

    goBack() {
        this.props.history.goBack();
    }
    toggleModal(){
        this.setState({
            reviewModal: !this.state.reviewModal,
        })
      }

    onChangeInput = (e) =>{
        this.setState({
            review: e.target.value
        })
    }
    handleChange = (startDate) => {
        this.setState({
          startDate,
        });
    }
    selectReviewHandler = (slotHash) =>{
        this.setState({
            reviewModal: true,
            slotHash: slotHash,
        })
    }
    submitReviewHandler = () =>{
        if(this.state.review && this.props.name && this.state.slotHash){
            this.props.dispatch(submitReviews(this.state.review, this.props.name, this.state.slotHash));
        }
        this.setState({
            reviewModal: false,
        })
    }

    dateConverter = (UNIX_timestamp) => {
        var unixDate = new Date(parseInt(UNIX_timestamp,10));
        return unixDate.toLocaleString('en-SG', {timeZone: 'Asia/Singapore',year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"numeric", hour12: true });    
     }
     
    render(){
    return (
        <div>
            <button onClick={this.goBack}>Go Back</button>
            <Modal
                isOpen={this.state.reviewModal}
                onRequestClose={this.toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                ariaHideApp={false}
                closeTimeoutMS={500}
                > 
                <div className="restaurantName">Give your review</div>
                <textarea onChange={(e)=>this.onChangeInput(e)} rows="4" cols="50"></textarea>
                <button onClick={()=>this.submitReviewHandler()}>Submit</button>
            </Modal>
            <div className="restaurantName">{this.props.name}</div>
            <br></br>
            {
                this.props.reservations ? (Object.keys(this.props.reservations).map((date)=>{
                    if(date !== "success"){
                        return (this.props.reservations[date].map((req,i)=>{
                            if(req.token.accepted){
                                return <div className="Token" key={i}>
                                <div className="restaurantName">{req.token.restaurantName}</div>
                                <div className="restaurantAddress">{req.token.restaurantAddress}</div>
                                <div className="TokenDateTime">{this.dateConverter(req.token.dateTime)}</div>
                                <div className="TokenDesc">
                                <div className="TokenTableNo">Table {req.token.tableNo}</div>
                                <div className="TokenPax">PAX: {req.token.pax}</div>
                                </div>
                                <div className="TokenState">{ req.token.accepted ? (req.token.visited ? "VISITED": "APPROVED"):"WAITING"}</div>
                                { req.token.visited ? 
                                    <button className="ReviewState" onClick={() => this.selectReviewHandler(req.hash)}> REVIEW </button> : null} 
                                
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
        name: state.getUserDataReducer.user.displayName,
        UID:state.getUserDataReducer.user.uid,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        reservations:state.getReservationsReducer.reservations,
    }
}

export default connect(mapStateToProps)(withRouter(Reservations));
