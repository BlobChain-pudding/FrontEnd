import './Restaurant.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';

import { Link } from 'react-router-dom';

class Restaurant extends Component {

    render(){
    return (
        <div>
             <div> 
                 <div className="nameText">
                 {this.props.name}
                 </div>
                 <br></br>
                 <Link to="/restaurant/createTokens">
                     <div className="buttonSearch">
                     Create Reservation Slots
                     </div>
                 </Link>
                 <br></br>
                 <Link to={`/restaurant/requests/${this.props.name}`}>
                     <div className="buttonMyReserve">
                     Reservations Applications
                     </div>
                 </Link>
                 <br></br>
                 <Link to={`/restaurant/reservations/${this.props.name}`}>
                     <div className="buttonMyRequests">
                         Check Reservations
                     </div>
                 </Link>
                 <button className="buttonSignOut">
                     SignOut
                 </button>
             </div>
        </div>
      );
}
 
}


const mapStateToProps = (state) => {
    return{
        name: state.getUserDataReducer.displayName,
        success:state.getUserDataReducer.success,
    }
}

export default connect(mapStateToProps)(withRouter(Restaurant));
