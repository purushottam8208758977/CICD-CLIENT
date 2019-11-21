import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core' // overiding default css properties
import GoogleImage from "../assets/google.png"
import { registration } from '../services/services'
import '../Registration.css'
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
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
        },
        'MuiOutlinedInput': {
            'input': {
                padding: "8.5px 11px"
            }
        },
        'MuiInputLabel': {
            'outlined': { transform: "translate(14px, 11px) scale(1)" }
        }
        ,
        "MuiInputBase": {
            "input": {
                fontSize: "14px"
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
    }

}));



export class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {//initializing state
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
        this.classes = useStyles.bind(this);
    }

    againLogin = () => {
        let path = '/'
        this.props.history.push(path)
    }

    handleRegistration = () => {

        console.log("\n\n\t in handle submit", this.state.password);

        if (this.state.password !== this.state.confirmPassword) { console.log("\n\n\t passwords dont match") }
        else {
            let registrationObject = {}
            registrationObject.firstName = this.state.firstName
            registrationObject.lastName = this.state.lastName
            registrationObject.email = this.state.email
            registrationObject.password = this.state.password

            console.log("\n\n\tObject ready to be sent --->", registrationObject)

            registration(registrationObject).then((responseReceived) => {
                console.log("\n\n\t Response ", responseReceived)
                if (responseReceived) {
                    if (responseReceived.data.success) {
                        toaster.notify(responseReceived.data.message)
                    }
                }
                else {
                    toaster.notify("SERVER NOT CONNECTED !")
                }

            }).catch((error)=>{
                console.log("fffff--->",error.response.data.message)
                toaster.notify(error.response.data.message)
            })
        }
    }
    handleFirstName = (event) => {
        let retrievedFirstName = event.target.value
        this.setState({//setting firstName
            firstName: retrievedFirstName
        })
        console.log("\n\n\t first name ", retrievedFirstName)
    }
    handleLastName = (event) => {
        let retrievedLastName = event.target.value
        this.setState({//setting lastName
            lastName: retrievedLastName
        })
        console.log("\n\n\t Last name ", retrievedLastName)
    }
    handleEmail = (event) => {
        let retrievedemail = event.target.value
        this.setState({//setting user name
            email: retrievedemail
        })
        console.log("\n\n\t email ", retrievedemail)
    }
    handlePassword = (event) => {
        let retrievedPassword = event.target.value
        this.setState({//setting password
            password: retrievedPassword
        })
        console.log("\n\n\t password ", retrievedPassword)
    }
    handleConfirmPassword = (event) => {
        let retrievedConfirmPassword = event.target.value
        this.setState({//setting confirm password
            confirmPassword: retrievedConfirmPassword
        })
        console.log("\n\n\t confirm pasword ", retrievedConfirmPassword)
    }
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Card style={
                        {
                            marginTop: "11.8%",
                            marginLeft: "20.8%",
                            position: "absolute",
                            width: "58.4%",
                            height: "63.5%"
                        }
                    }>
                        <div className="Title"> <b> <span className="F">F</span>
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
                        <div className="Message">
                            Create your Google Account
                        </div>

                        <div className="FirstName" ><TextField
                            id="outlined-email-input"
                            label="First name"
                            className={this.classes.textField}
                            type="string"
                            value={this.state.firstName}  //binding first name ...entry point into front end
                            onChange={this.handleFirstName}  //invoking respective method to initiate reponse process to backend
                            name="First name"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined" />
                        </div>

                        <div className="LastName">
                            <TextField
                                id="outlined-email-input"
                                label="Last name"
                                className={this.classes.textField}
                                type="string"
                                value={this.state.lastName}  //binding last name ...entry point into front end
                                onChange={this.handleLastName}  //invoking respective method to initiate reponse process to backend
                                name="Last name"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined" />
                        </div>

                        <div className="UserName">
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                className={this.classes.textField}
                                type="string"
                                value={this.state.email}  //binding user name ...entry point into front end
                                onChange={this.handleEmail}  //invoking respective method to initiate reponse process to backend
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined" />
                        </div>

                        <div className="Password">
                            <TextField
                                id="outlined-email-input"
                                label="Password"
                                className={this.classes.textField}
                                type="password"
                                value={this.state.password}  //binding password ...entry point into front end
                                onChange={this.handlePassword}  //invoking respective method to initiate reponse process to backend
                                name="Password"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined" />
                        </div>

                        <div className="Confirm">
                            <TextField
                                id="outlined-email-input"
                                label="Confirm"
                                className={this.classes.textField}
                                type="password"
                                value={this.state.confirmPassword}  //binding first name ...entry point into front end
                                onChange={this.handleConfirmPassword}  //invoking respective method to initiate reponse process to backend
                                name="Confirm"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined" />
                        </div>

                        <div className="Instructions">Use 8 or more characters with a mix of letters, numbers &</div>
                        <div className="Symbols">symbols</div>

                        <div className="Instead" onClick={this.againLogin} ><b>Sign in instead</b></div>

                        <div className="Register" onClick={this.handleRegistration}><BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin} onClick={this.handleToggle}>
                            <b> Submit</b>
                        </BootstrapButton></div>

                        <div className="GoogleImage"><img src={GoogleImage} alt="google pic"></img></div>
                    </Card></MuiThemeProvider></div>
        )
    }
}
