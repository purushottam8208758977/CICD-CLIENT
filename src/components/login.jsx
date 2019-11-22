import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core' // overiding default css properties
import { login } from '../services/services'
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import '../Login.css'
// import Loader from 'react-loader-spinner'
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * @description - This prop is a inbuilt prop we are modifying it
 */
const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'elevation1': {
                boxShadow: "0px 0px 3px 0px #888888",
            }
        },
        'MuiFormControl': {
            'marginNormal': {
                width: "100%"
            }
        },
        'MuiButton': {
            'containedPrimary': {
                top: "90%",
                left: "80%"
            }
        }
    }
})

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 14,
        padding: '7px 24px 7px 24px',
        border: '1px solid',
        lineHeight: "20px",
        backgroundColor: '#287ae6',
        borderColor: '#287ae6',
        fontFamily: [
            "Google Sans", "arial", "sans-serif"
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
    },
    root:{
        flexGrow:1
    }
}));



export class Login extends Component {
    constructor() {
        super()
        this.state = {
            toggle: false,
            email: "",
            password: "",
            toggleLoad: false
        }
        this.classes = useStyles.bind(this);
    }

    toDashboard = () => {
        let path = '/home'
        this.props.history.push(path)
    }

    componentDidMount(){
        localStorage.clear()
    }
    handleLogin = () => {

        this.setState({ toggleLoad: true })

        console.log(`\n\n\t In handle login email - ${this.state.email}  password - ${this.state.password}`);

        let loginObject = {}
        loginObject.email = this.state.email
        loginObject.password = this.state.password

        console.log("\n\n\tObject ready to be sent --->", loginObject)

        login(loginObject).then((responseReceived) => {
            if (responseReceived) {
                if (responseReceived.data.success) {


                    console.log("\n\n\t after login url", responseReceived.data.data)
                    localStorage.setItem('token', responseReceived.data.data.token)
                    //for logout menu
                    localStorage.setItem('firstName',responseReceived.data.data.firstName)
                    localStorage.setItem('lastName',responseReceived.data.data.lastName)
                    localStorage.setItem('profilePic',responseReceived.data.data.url)
                    setTimeout(() => {
                        toaster.notify(responseReceived.data.message)
                        this.toDashboard()
                    }, 4000);


                }
            }
            else {
                toaster.notify("SERVER NOT CONNECTED !")
            }
        }).catch((error) => {
            //console.log("--->", error.response.data.message)
            //toaster.notify(error.response.data.message)
        })
    }
    collectEmail = (event) => {
        let retrievedEmail = event.target.value
        this.setState({//setting email
            email: retrievedEmail
        })
        console.log("\n\n\t Email ", retrievedEmail)
    }

    collectPassword = (event) => {
        let retrievedPassword = event.target.value
        this.setState({//setting password
            password: retrievedPassword
        })
        console.log("\n\n\t Password ", retrievedPassword)
    }

    handleToggle = () => {
        this.setState({ toggle: true })
    }

    mapRegistration = () => {
        let path = '/registration'
        this.props.history.push(path)
    }

    forgetPassword = () => {
        let path = '/accountRecovery'
        this.props.history.push(path)
    }
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Card style={
                        {
                            marginTop: "13%",
                            marginLeft: "32.5%",
                            position: "absolute",
                            width: "35%",
                            height: "60%"
                        }
                    }>
                        <div className="Login"> <b> <span className="F">F</span>
                            <span className="U">u</span>
                            <span className="N">n</span>
                            <span className="F">d</span>
                            <span className="O">o</span>
                            <span className="U">o</span>
                            <span> </span>
                            <span className="F">N</span>
                            <span className="U">o</span>
                            <span className="N">t</span>
                            <span className="F">e</span>
                            <span className="O">s</span>
                        </b></div>
                        <div className="SignIn"> <br /> Sign in </div>
                        {this.state.toggle ?
                            <div className="EmailInput">
                                <TextField
                                    id="outlined-email-input"
                                    label="Password"
                                    className={this.classes.textField}
                                    type="password"
                                    value={this.state.password}  //binding password ...entry point into front end
                                    onChange={this.collectPassword}  //invoking respective method to initiate reponse process to backend
                                    name="Password"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined" /> <br />
                                {this.state.toggleLoad ?
                                    <div className={this.classes.root} id="Loader">
                                        <LinearProgress />
                                    </div>
                                    :
                                    <div className="HandleSubmit" onClick={this.handleLogin}>
                                        <BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin}>
                                            <b> Submit</b>
                                        </BootstrapButton>  </div>
                                }
                                <br /><br />

                                <div className="Forgot" onClick={this.forgetPassword} > Forgot password ? </div>
                            </div>
                            :
                            <div className="EmailInput">
                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    className={this.classes.textField}
                                    type="email"
                                    value={this.state.email}  //binding email ...entry point into front end
                                    onChange={this.collectEmail}  //invoking respective method to initiate reponse process to backend
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined" /><br />
                                <div className="HandleNext">   <BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin} onClick={this.handleToggle}>
                                    <b> Next</b>
                                </BootstrapButton></div>
                                <div className="CreateAccount" onClick={this.mapRegistration}> Create account
                            </div>
                            </div>
                        }
                    </Card>
                    <div id="mee">PURUSHOTTAM</div>
                </MuiThemeProvider>
            </div>


        )

    }
}