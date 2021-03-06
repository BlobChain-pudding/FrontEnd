import './User.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this); // i think you are missing this
     }
     
     goBack(){
         this.props.history.goBack();
     }
     
    
    render(){
    return (
        <div>
           <div> 
               <div className="nameText">
               {this.props.name}
               </div>
               <br></br>
               <Link to="/user/search">
                   <div className="buttonSearch">
                   Restaurant Search
                   </div>
               </Link>
               <br></br>
               <Link to={`/user/reservations/${this.props.name}`}>
                   <div className="buttonMyReserve">
                   My Reservations
                   </div>
               </Link>
               <br></br>
               <Link to={`/user/requests/${this.props.name}`}>
                   <div className="buttonMyRequests">
                       My Requests
                   </div>
               </Link>
               <button className="buttonSignOut" onClick={this.goBack}>
                   SignOut
               </button>
           </div>
        </div>
      );
}
 
}


const mapStateToProps = (state) => {
    return{
        name: state.getUserDataReducer.user.displayName,
        success:state.getUserDataReducer.success,
    }
}

export default connect(mapStateToProps)(withRouter(User));
