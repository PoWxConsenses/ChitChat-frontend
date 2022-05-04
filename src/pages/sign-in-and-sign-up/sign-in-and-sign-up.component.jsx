import React from 'react'
import {connect} from 'react-redux'
import './sign-in-and-sign-up.style.scss'
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

class SignInAndSignUp extends React.Component{
  
    render(){
        return (
            <div className="sign-in-and-sign-up">
                <div className="left-animation-container">
    
                </div>
                <div className="right-form-container">
                    {this.props.isSignInForm? <SignIn />:<SignUp/>}
                </div>
            </div> 
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        isSignInForm:state.toggle.isSignInForm
    }
}
export default connect(mapStateToProps)(SignInAndSignUp);