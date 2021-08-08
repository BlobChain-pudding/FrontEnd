import './Search.css';
import {withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';
import { Component } from 'react';
import { getRestaurants} from '../../../store/actions';

class Search extends Component {
    
    constructor(props){
        super(props);
        this.props.dispatch(getRestaurants());
        this.onSearchValueChange = this.onSearchValueChange.bind(this);
    }
    state = {
        restaurantSearch:"",
    }
    onSearchValueChange = (e) =>{
        this.setState({
            restaurantSearch: e.target.value});
    }
    render(){
        
    return (
        <div>
            
            <div>
            <input placeholder="Restaurant Search" value={this.state.restaurantSearch} type="text" onChange={(e)=>this.onSearchValueChange(e)}></input>
            <div className="RestaurantList">
            {this.props.restaurants ? this.props.restaurants.map((res)=>{
                if(res.name.includes(this.state.restaurantSearch)){
                    return <div key={res.address}>
                    <div className="singleRestaurant">
                    <div onClick={()=>{this.props.history.push(`/user/search/${res.name}/${res.address}`)}}>
                        <div className="restaurantName">{res.name}</div>
                        <div className="restaurantAddress">{res.address}</div>
                    </div> 
                    <button className="reviewButton" onClick={()=>{this.props.history.push(`/restaurant/reviews/${res.name}/${res.address}`)}}>Reviews</button>
                    </div></div>
                }
                return null;
            }): null}
            </div>
            </div>
        </div>
      );
}
 
}


const mapStateToProps = (state) => {
    
    return{
        name: state.getUserDataReducer.displayName,
        uid: state.getUserDataReducer.uid,
        success:state.getUserDataReducer.success,
        type:state.getUserDataReducer.type,
        restaurants: state.getRestaurantsReducer.restaurants,
    }
}

export default connect(mapStateToProps)(withRouter(Search));
