import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core' // overiding default css properties
import '../ForgetPassword.css'
import { forgetPassword } from '../services/services'
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
        }
        
    }
})

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

export class ForgetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: ""
        }
        this.classes = useStyles.bind(this);
    }
    collectEmail = (event) => {
        let retrievedEmail = event.target.value
        this.setState({//setting email
            email: retrievedEmail
        })
        console.log("\n\n\t Email ", retrievedEmail)
    }

    handleForgetPassword = () => {

        console.log(`\n\n\t In handle forget password email - ${this.state.email} `);


        let forgetObject = {}
        forgetObject.email = this.state.email


        console.log("\n\n\tObject ready to be sent --->", forgetObject)


        forgetPassword(forgetObject).then((data) => {
            if (data) {
                console.log("\n\n\t Response ", data)
                toaster.notify(data.data.message)
            }
        }).catch((error) => {
            console.log("fffff--->", error.response.data.message)
            toaster.notify(error.response.data.message)
        })


    }
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>

                    <Card className="ForCard">  
                        <div className="TitleF"> <b>
                            <span className="F">F</span>
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
                        <div className="Find">Lets find your account </div>

                        <div className="EnterEmail">Enter your email</div>

                        <div className="Enter">
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                className={this.classes.textField}
                                type="string"
                                value={this.state.email}  //binding email ...entry point into front end
                                onChange={this.collectEmail}  //invoking respective method to initiate reponse process to backend
                                name="Last name"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined" />
                        </div>

                        <div className="FindButton" onClick={this.handleForgetPassword}>
                        Submit
                        {/* <BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin} onClick={this.handleToggle}>
                            <b> Submit</b>
                        </BootstrapButton> */}
                        </div>
                    </Card>
                </MuiThemeProvider>
            </div>

        )
    }
}
