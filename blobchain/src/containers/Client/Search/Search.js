import './Search.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { getRestaurants} from '../../../store/actions';

class Search extends Component {
    
    constructor(props){
        super(props);
        this.props.dispatch(getRestaurants());
        
    }

    selectRestaurantHandler = (res) => {
        ;
    }
    render(){
        
    return (
        <div>
            <input placeholder="Restaurant Search"></input>
            <button>Search</button>
            {this.props.restaurants ? this.props.restaurants.map((res)=>{
                return <div key={res.address}>
                    <div>
                    <button onClick={()=>{this.props.history.push(`/client/search/${res.name}/${res.address}`)}}>
                    {res.name}<br></br>{res.address}
                    </button>   
                    <button onClick={()=>{this.props.history.push(`/restaurant/reviews/${res.name}/${res.address}`)}}>Reviews</button>
                    </div></div>
            }): null}
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
        restaurants: state.getRestaurantsReducer.restaurants,
    }
}

export default connect(mapStateToProps)(withRouter(Search));
