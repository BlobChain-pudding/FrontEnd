import './Reviews.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { getReviews } from '../../../store/actions';
class Reviews extends Component {
    
    constructor(props){
        super(props);
        this.props.dispatch(getReviews(props.match.params.addr,false));
    }

    render(){
    return (
        <div>
            <div>{this.props.match.params.name}</div>
            <br></br>
            <div>{this.props.match.params.addr}</div>
            <br></br>
            
            {
                this.props.reviews ? (Object.keys(this.props.reviews).map((date)=>{
                    if(date!=="success"){
                        return <div>
                            {date}
                            <br></br>
                            {(this.props.reviews[date].map((review,i)=>{
                            return <div key={i}>{review[0]}
                                </div>
                        }))}</div>
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
        reviews:state.getReviewsReducer,
    }
}

export default connect(mapStateToProps)(withRouter(Reviews));
