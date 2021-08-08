import './SignIn.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signUp } from './../../store/actions/sharedActions';
class SignIn extends Component{
  constructor(props){
    super(props);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setAccountType = this.setAccountType.bind(this);
    this.setSignUp = this.setSignUp.bind(this);
    this.setName = this.setName.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
  }
  state = {
    email: "",
    password: "",
    accountType:"user",
    signup:false,
    name:"",
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
  setName = (e) =>{
    this.setState({
      name: e,
    })
  }
  setSignUp = (e) =>{
    this.setState({
      signup: e,
    })
  }

  signInHandler = () =>{
    var em = this.state.email;
    var pass = this.state.password;
    var acc = this.state.accountType;
    
    if(em && pass && acc){
      var name = this.state.name;
      if(this.state.signup){
        console.log(em, pass, acc, name);
        if(name){
        this.props.dispatch(signUp(em, pass, name ,acc,(aT)=>{this.props.history.push("/"+acc)}))
        }
      }else{
        
        this.props.dispatch(
          signin(em, pass, acc, (aT)=>{this.props.history.push("/"+acc)})
        );
      }
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
        {
          this.state.signup ?  <input placeholder={this.state.accountType==="user" ? "Your Name" : "Restaurant Name"} type="text" value={this.state.name} onChange={(e)=>this.setName(e.target.value)}/>: null
        }
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
