//take note component
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import '../Dashboard.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


//hitting api
import { createNote } from '../services/services'

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const menuItems = ['Add Label']

export class TakeNote extends Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null,
            toggle: false,
            title: "",
            description: ""
        }
        this.classes = useStyles.bind(this);
    }

    handleTakeNote = () => { // this will toggle the both cards
        this.setState({ toggle: true })
    }

    fetchingTitle = (event) => {
        let fetchedTitle = event.target.value
        this.setState({
            title: fetchedTitle
        })
        console.log("\n\nTitle-->", fetchedTitle);

    }

    fetchingDescription = (event) => {
        let fetchedDescription = event.target.value
        this.setState({
            description: fetchedDescription
        })
        console.log("\n\nDescription-->", fetchedDescription);
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    closeMenu = () => {
        this.setState({anchorEl:null})
    }

    closeTakeNote=()=>{
        this.setState({toggle:false})
        // this.creatingNote()
    }
    creatingNote = () => {
        console.log("\n\nCreating a note ... data to be sent -->")

        let noteObject = {}
        noteObject.title = this.state.title
        noteObject.description = this.state.description

        console.log("\n\n\tObject ready to be sent --->", noteObject)

        createNote(noteObject).then((responseReceived) => {
            if (responseReceived) {
                if (responseReceived.data.success) {
                    this.props.refresh() 
                    this.setState({ title: "" })
                    this.setState({ description: "" })
                    this.setState({ toggle: false }) 
                    toaster.notify(responseReceived.data.message)
                }
            }
            else {
                toaster.notify("SERVER NOT CONNECTED !")
            }
        }).catch((error) => {
            // console.log(error.response.data.message)
            toaster.notify(error.response.data.message)
        })

    }
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl)
        return (
            <div id="NoteDiv">
              
              <ClickAwayListener onClickAway={this.closeTakeNote}>
                {this.state.toggle ?
                    <Card id="TakeN2" className={this.classes.card}>
                        <TextField
                            id="standard-basic"
                            placeholder="Title"
                            readOnly="true"
                            className={this.classes.textField}
                            value={this.state.title}  //binding title ...entry point into front end
                            onChange={this.fetchingTitle}  //invoking respective method to initiate reponse process to backend
                            margin="normal"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                        <TextField
                            id="standard-basic"
                            placeholder="Description"
                            readOnly="true"
                            className={this.classes.textField}
                            value={this.state.description}  //binding description ...entry point into front end
                            onChange={this.fetchingDescription}  //invoking respective method to initiate reponse process to backend
                            margin="normal"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                        <div id="IconsList">
                            <div id="Icons">
                                <Button><img src={require('../assets/reminder.svg')} alt="reminder pic"></img> </Button>
                                <Button> <img src={require('../assets/pallete.svg')} alt="pallete pic"></img>  </Button>
                                <Button> <img src={require('../assets/archive.svg')} alt="archive pic "></img> </Button>
                                <Button onClick={(event) => this.handleMenu(event)}><MoreVertIcon></MoreVertIcon></Button>
                            </div>
                            <Button onClick={this.creatingNote} ><b>close</b></Button></div>
                    </Card>

                    :
                    <Card id="TakeN" onClick={this.handleTakeNote} className={this.classes.card}>
                        <TextField
                            id="standard-basic"
                            placeholder="Take a note ..."
                            readOnly="true"
                            className={this.classes.textField}
                            underline="none"
                            margin="normal"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Card>
                }
</ClickAwayListener>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.closeMenu}
                >
                    {menuItems.map((option, index) => (
                        <MenuItem key={index}
                            id="dropMenu">
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )

    }
}