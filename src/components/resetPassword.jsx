import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core' // overiding default css properties
import '../ResetPassword.css'
import { resetPassword } from '../services/services'
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

export class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            password: ""
        }
        this.classes = useStyles.bind(this);
    }
    collectPassword = (event) => {
        let retrievedPassword = event.target.value
        this.setState({//setting email
            password: retrievedPassword
        })
        console.log("\n\n\t new password ", retrievedPassword)
    }
    resettingPassword = () => {
        console.log(`\n\n\t In reset password - ${this.state.password} `);

        let resetObject = {}
        resetObject.password = this.state.password

        console.log("\n\n\tObject ready to be sent --->", resetObject)
        let token = this.props.match.params.token
        console.log("\n\n\tToken extracted from url --->",token)

        resetPassword(resetObject,token).then((data) => {
            if (data) { console.log("\n\n\t Response ", data)
            toaster.notify(data.data.message) 
        }
        }).catch((error)=>{
            console.log("fffff--->",error.response.data.message)
            toaster.notify(error.response.data.message)
        })
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
                        <div className="TitleR"> <b>
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
                        <div className="InstructionsR">Enter a new password</div>

                        <div className="InstructionsRE"><b>Use 8 or more characters with a mix of letters, numbers & symbols.</b></div>


                        <div className="EnterR">
                            <TextField
                                id="outlined-email-input"
                                label="Password"
                                className={this.classes.textField}
                                type="password"
                                value={this.state.password}  //binding password ...entry point into front end
                                onChange={this.collectPassword}  //invoking respective method to initiate reponse process to backend
                                name="Last name"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined" />
                        </div>

                        <div className="FindButtonR" onClick={this.resettingPassword}><BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin} onClick={this.handleToggle}>
                            <b> Submit</b>
                        </BootstrapButton></div>
                    </Card>
                </MuiThemeProvider>
            </div>


        )
    }
}
