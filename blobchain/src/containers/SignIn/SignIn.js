import './SignIn.css';
import {withRouter} from 'react-router-dom';
function SignIn() {
  return (
    <div>
      <div>Blobchain</div>
      <input placeholder="Email" type="email"/>
      <br></br>
      <input placeholder="Password" type="password"/>
      <br></br>
      <button>Sign in</button>
      <br></br>
      <a href="/client">Client</a>
      <br></br>
      <a href="/restarant">Restaurant</a>
    </div>
    
  );
}


export default withRouter(SignIn);
