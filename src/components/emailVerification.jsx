import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core' // overiding default css properties
import '../EmailVerification.css'
import { emailVerification } from '../services/services'
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

export class EmailVerification extends Component {
    constructor() {
        super()
        this.state = {
            toggle: false
        }
        this.classes = useStyles.bind(this);
    }
    
    /**
     * @description - Captures the token from params and then passes it on to the back end 
     *                After receiving the response from the backend it will show the login button 
     *                to login .
     */
    handleToggle = () => {
        console.log("token --->",this.props.match.params.token)
        this.setState({//setting firstName
                token: this.props.match.params.token
            })
            emailVerification(this.props.match.params.token).then((verificationResult)=>{
                if(verificationResult){console.log("\n\n\t Verification response -->",verificationResult)}
                this.setState({ toggle: true })
            })
    }

    toLogin = () => {
        let path = '/'
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
                        
                        <div className="TitleE"> <b>
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

                        {this.state.toggle ?
                            <div> <div className="InstructionsREV" ><b>Your account is now active !</b></div>
                                <div className="FindButtonR" onClick={this.toLogin} ><BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin} onClick={this.handleToggle}>
                                    <b> Login !</b>
                                </BootstrapButton></div>
                            </div>
                            :
                            <div><div className="Activate" ><b>Hit 'ACTIVATE' to activate your account !</b></div>
                                <div className="ActivateButton" onClick={this.handleToggle}><BootstrapButton variant="contained" color="primary" disableRipple className={this.classes.margin} onClick={this.handleToggle}>
                                    <b> ACTIVATE !</b>
                                </BootstrapButton></div>
                            </div>
                        }
                    </Card>
                </MuiThemeProvider>
            </div>


        )
    }
}
