import './SignIn.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from './../../store/actions/sharedActions';
class SignIn extends Component{
  constructor(props){
    super(props);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setAccountType = this.setAccountType.bind(this);
    this.setSignUp = this.setSignUp.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
  }
  state = {
    email: "",
    password: "",
    accountType:"user",
    signup:false,
  }
  setEmail = (e) => {
    this.setState({
      email: e,
    })
  }
  setPassword = (e) =>{
    this.setState({
      password: e,
    })
  }
  setAccountType = (e) =>{
    this.setState({
      accountType: e,
    })
  }
  setSignUp = (e) =>{
    this.setState({
      signup: e,
    })
  }

  signInHandler = () =>{
    console.log(1);
    if(this.state.signUp){
      
    }else{
      var em = this.state.email;
      var pass = this.state.password;
      var acc = this.state.accountType;
      
      this.props.dispatch(
        signin(em, pass, acc, (aT)=>{this.props.history.push("/"+acc)})
      );
    }

  }
 
  render(){
    return (
      <div>
        <div className="TitleCard">Blobchain</div>
          <div className="SubtitleCard">{this.state.signup ? "Create New Account" : "Existing User?"}</div>
        <input placeholder="Email" type="email" value={this.state.email} onChange={(e)=>this.setEmail(e.target.value)}/>
        <br></br>
        <input placeholder="Password" type="password" value={this.state.password} onChange={(e)=>this.setPassword(e.target.value)}/>
        <br></br>
        <select className="accType" value={this.state.accountType} onChange={(e)=>this.setAccountType(e.target.value)}>
          <option value="user">User</option>
          <option value="restaurant">Restaurant</option>
        </select>
        <button className="buttonSignIn" onClick={()=>this.signInHandler()}>
        {
          this.state.signup ? "Sign Up": "Sign In"
        }
        </button>
        <button className="buttonSignIn" onClick={()=>this.setSignUp(!this.state.signup)}>
        {
          this.state.signup ?  "Existing User":"Create Account"
        }
        </button>
      </div>
      
    );
  }
  
}


export default connect()(withRouter(SignIn));
