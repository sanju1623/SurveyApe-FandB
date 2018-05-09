import axios from 'axios';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';

import swal from 'sweetalert';

const ROOT_URL = 'http://localhost:8080';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                "email": "",
                "password": ""
            },
            isLoggedin: false,
        };
    }

    handleSignInSubmit() {
        // alert("inside sigin");
        const temp = this.state.userdata;

        const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

        const headers = {
            'Accept': 'application/json'
        };

        const dologin = fetch(`${api}/login`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp),
            credentials: 'include'
        }).then(res => res.json())
            .catch(error => {
                swal("Wrong Password", "Please enter a valid password", "warning")
            });

        dologin.then((data) => {
            if (data.code == 401) {
                swal("Wrong Password", "Please enter a valid password", "warning")
            }
            else if (data.code == 200) {
                this.setState(
                    {
                        isLoggedin: true
                    }
                );
                this.props.history.push("/SurveyBuilder");
            }
            else if (data.code == 400) {
                //swal("Account UnVerified", "Please verify your Account", "warning")
                // this.props.history.push("/AccountVerify");
                this.props.history.push({
                    pathname: '/AccountVerify',
                    state: this.state.userdata.email
                });
            }
            else {
                swal("Invalid User", "User does not exist.Please Sign up", "error")
                this.props.history.push("/signUp");
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center ">
                    <div className="col-md-6 indexZ" style={{'opacity': '0.4'}}>
                        <img src={signupimage} className={"indexZ"}/>
                    </div>

                    <div className="col-md-4 cardbox">
                        <h4 className='Questrial' style={{'margin-bottom': '10px', 'text-align': 'center'}}>SIGN IN</h4>
                        <input type="email" className="inputfield" placeholder="Email"
                               value={this.state.userdata.email}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           email: event.target.value
                                       }
                                   });
                               }}
                        /><br/>
                        <input type="password" className="inputfield" placeholder="Password"
                               value={this.state.userdata.password}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           password: event.target.value
                                       }
                                   });
                               }}
                        /><br/>
                        <div className="row justify-content-center">
                            <button className="ybutton" onClick={() => {
                                this.handleSignInSubmit();
                            }}>SIGN IN
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="ybuttonSecondary" onClick={() => {
                                this.props.history.push("/signUp");
                            }}>or SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Homepage);
