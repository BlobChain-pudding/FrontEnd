import './Client.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { signinClient } from './../../store/actions';
import { Link } from 'react-router-dom';

class Client extends Component {
    constructor(props){
        super(props);
        this.props.dispatch(signinClient());
    }
    render(){
    return (
        <div>
            {
                this.props.success ? (
                <div> 
                    {this.props.name}
                    <br></br>
                    <Link to="/client/search">Restaurant Search</Link>
                    <br></br>
                    <Link to="/client/reservations">My Reservations</Link>
                    <br></br>
                    <Link to="/client/requests">My Requests</Link>
                </div>
                    ) : null
            }
        </div>
      );
}
 
}


const mapStateToProps = (state) => {
    return{
        name: state.getUserDataReducer.name,
        pubAddr: state.getUserDataReducer.pubAddr,
        success:state.getUserDataReducer.success,
    }
}

export default connect(mapStateToProps)(withRouter(Client));
