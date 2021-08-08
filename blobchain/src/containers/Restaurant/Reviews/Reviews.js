import './Reviews.css';
import { withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { getOwnReviews, getReviews } from '../../../store/actions';
class Reviews extends Component {
    
    constructor(props){
        super(props);
        console.log(props.match.params.addr);
        if(props.type==="user"){
            this.props.dispatch(getReviews(props.match.params.addr,false));
        }else if(props.type==="restaurant"){
            this.props.dispatch(getOwnReviews());
        }
        
    }

    render(){
    return (
        <div>
            <div className="restaurantName">{this.props.match.params.name}</div>
            <div className="restaurantAddress">{this.props.type==="user" ? this.props.match.params.addr:null}</div>
            <br></br>
            <div className="DateLists">
             
            {
                this.props.reviews ? (Object.keys(this.props.reviews).map((date)=>{
                    if(date!=="success"){
                        return <div className="ReviewsList" key={date}>
                            <div className="ReviewDate">{date}</div>
                            {(this.props.reviews[date].map((review,i)=>{
                            return <div key={i} className="singleReview">
                                <div className="reviewer">{review[1]}</div>
                                <div className="review">{review[0]}</div>
                                </div>
                        }))}</div>
                    }
                    return null;
                    
                })) : null 
            }
               
            </div>
        </div>
      );
}
 
}


const mapStateToProps = (state) => {
    
    return{
        name: state.getUserDataReducer.user.displayName,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        reviews:state.getReviewsReducer.reviews,
    }
}

export default connect(mapStateToProps)(withRouter(Reviews));
