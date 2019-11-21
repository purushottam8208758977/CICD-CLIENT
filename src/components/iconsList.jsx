// icons list used by every note ONLY

import React, { Component } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { updateNote, allLabels, addLabelOnNote } from '../services/services'
import Tooltip from '@material-ui/core/Tooltip';
import MDtime from 'react-ionicons/lib/MdTime'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core' // overiding default css properties
import TextField from '@material-ui/core/TextField';
import MenuList from '@material-ui/core/MenuList';

//child components
import { ColorPopover } from './colorPopover'
import { LabelOnNote } from './labelOnNote'
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';

const noteMenuItems = ['Delete Note', 'Add Label']

const theme = createMuiTheme({
    overrides: {
        "MuiButton": {
            "root": {
                minWidth: "0px"
            }
        }
    }
})

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));
export class IconsList extends Component {
    mappinglabels;
    constructor() {
        super()
        this.state = {
            anchorEl: null, // determines the position menu bar ...where to open
            parentMenu: false,// parent menu's key ---> opens delete note and add label menu
            colorPallete: false,// key to open color pallete
            childMenu: false, // childe menu which opens after parent menu closed 
            reminderMenu: false,
            labels: [],
            userReminderTime: "",
            userReminderDate: "",
            reminderChildMenu:false,
            disabled:false
        }
        this.ColorPopover = React.createRef()
        this.classes = useStyles.bind(this);
    }
    /**
     * @description - This method is invoked after clicking to more vert icon ...it opens a menu
     */
    handleMenu = (event) => {
        //opens the parent menu and the anchor el sets a specific position on the screen
        this.setState({ anchorEl: event.currentTarget, parentMenu: true })
    }

    closeMenu = () => {
        this.setState({ parentMenu: false, anchorEl: null, childMenu: false, reminderMenu: false })
    }

    refreshBoth = () => {
        this.props.refreshing()
    }
    archiveTheNote = () => {
        //initiating archiving process
        let archiveObject = {}
        archiveObject.noteId = this.props.individualNoteData._id
        archiveObject.updating = { archive: true }

        updateNote(archiveObject).then((responseReceived) => {
            console.log("\n\n\tIcons list --> archive response--->", responseReceived)
            this.refreshBoth()
        })
    }

    handleNoteEvents = (event, index) => {
        if (index === 0) {
            //initiating trashing process
            this.setState({ anchorEl: null }) // for closing the pop up of menu
            let deletionObject = {}
            deletionObject.noteId = this.props.individualNoteData._id
            deletionObject.updating = { trash: true }
            updateNote(deletionObject).then((responseReceived) => {
                console.log("\n\n\tIcons list --> trash response--->", responseReceived)
                this.props.refreshing()
            })
        }
        else {//clicked on index ===1 a-->Add label
            //close the parent menu first and open the child menu
            this.setState({ childMenu: true, parentMenu: false })
            //adding a label (displaying labels list)
            allLabels().then((responseReceived) => {
                console.log("\n\n\tIcons list --> Labels --->", responseReceived.data.data)
                this.setState({ labels: responseReceived.data.data })

            })

        }
    }
    settingReminder = (requestValue) => {
        // this.setState({ reminderMenu:false });

        /** today current date with current system time */

        var today = new Date();
        let day = today.getDate(); /** day of current date */
        let month = today.getMonth();/** month of current date */
        let year = today.getFullYear();/** year of current date */
        let reminderDate; /** common variable for collecting reminder time */

        /** for reminder setting for today itself with 8 PM */
        if (requestValue === 1) {
            reminderDate = (new Date(year, month, day, 20, 0, 0)).toString();
            console.log("today date", reminderDate);

        } /** for reminder setting for tomorrow with time 8 AM */
        else if (requestValue === 2) {
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            tomorrow.setHours(8);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);
            reminderDate = tomorrow.toString()
            console.log("tomorrow date ", reminderDate);

        } /** for reminder setting for next week with time 8 AM */
        else if (requestValue === 3) {
            var weekdayValue = today.getDay();/** week day value of current [0-sun,1-mon] */
            let date = new Date(today.setDate(today.getDate() + weekdayValue + (weekdayValue === 0 ? -6 : 2)));
            date.setHours(8);
            date.setMinutes(0);
            date.setSeconds(0);
            reminderDate = date.toString();
            console.log("next monday date", reminderDate);

        } /** for reminder setting for user selected date and time*/
        else {
            let concatDate = this.state.userReminderDate + " " + this.state.userReminderTime;
            let newDate = new Date(concatDate)
            reminderDate = newDate.toString();
            console.log("new date", reminderDate);
        }

        let noteRminderUpdate = {
            updating: { reminder: reminderDate },
            noteId: this.props.individualNoteData._id
        }
        updateNote(noteRminderUpdate).then((data) => {
            console.log(data);
            this.props.refreshing()
            this.setState({ anchorEl: null }) // for closing the pop up of menu
            this.setState({reminderChildMenu:false,reminderMenu:false})

        }).catch((err) => {
            console.log(err);
        })
    }

    openColorPallete = (event) => {
        console.log("\n\n\tOn color icon")
        this.ColorPopover.current.handlePopoverOpen(event)
    }

    openReminderMenu = (event) => {
        //opening reminder menu
        console.log("\n\n\tOpening reminder menu")
        this.setState({ anchorEl: event.currentTarget, reminderMenu: true })
    }

    addingLabelOnNote = (event, index) => {
        this.closeMenu()
        let labelObject = {}
        console.log("\n\n\tIndex received  labels ->", this.state.labels[index]._id)
        labelObject.noteId = this.props.individualNoteData._id
        labelObject.labelId = this.state.labels[index]._id
        addLabelOnNote(labelObject).then((reponseOfAddingLabel) => {
            console.log("\n\n\tResponse of adding label on note", reponseOfAddingLabel)
            this.refreshBoth()
        })
    }
    openReminderChildMenu = () => {
        this.setState({reminderChildMenu:true,reminderMenu:false})
    }
    handleDate = (event) => {
        this.setState({ userReminderDate: event.target.value })
    }

    handleTime = (event) => {
        this.setState({ userReminderTime: event.target.value })
    }
    activateInput=()=>{
        this.setState({disabled: !this.state.disabled})
    }
    render() {
        const { anchorEl } = this.state;
        this.mappingLabels = this.state.labels.map((data, index) => {
            console.log("\n\n\tData to be sent to individual label", data)
            return (
                <LabelOnNote key={index}
                    data={data}
                />
            )
        })
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div id="Icons">
                        <Tooltip title="Reminder"><Button onClick={(event) => this.openReminderMenu(event)}><img src={require('../assets/reminder.svg')} alt="reminder pic"></img> </Button></Tooltip>
                        <Tooltip title="Change color"><Button onClick={(event) => this.openColorPallete(event)}><img src={require('../assets/pallete.svg')} alt="pallete pic"></img></Button></Tooltip>
                        <Tooltip title="Archive"><Button onClick={this.archiveTheNote}> <img src={require('../assets/archive.svg')} alt="archive pic "></img> </Button></Tooltip>
                        <Tooltip title="Add image"><Button onClick={this.activateInput} > <img src={require('../assets/image.svg')} alt="add pic " /></Button></Tooltip>
                        <Tooltip title="More"><Button onClick={(event) => this.handleMenu(event)}><MoreVertIcon></MoreVertIcon></Button></Tooltip>
                        <input id="hide" type="file" size="60" 
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        />
                    </div>
                    {/* PARENT MENU */}
                    <Menu
                        anchorEl={anchorEl}
                        open={this.state.parentMenu}
                        onClose={this.closeMenu}
                    >
                        {noteMenuItems.map((choice, index) => (
                            <MenuItem onClick={(event) => this.handleNoteEvents(event, index)} key={index}
                                id="dropMenu">
                                {choice}
                            </MenuItem>
                        ))}
                    </Menu>
                    <ColorPopover refreshPostColorChange={this.refreshBoth} settingColor={this.props.individualNoteData} ref={this.ColorPopover} openPallete={this.state.colorPallete} />
                    {/* CHILD MENU */}
                    <Menu
                        anchorEl={anchorEl}
                        open={this.state.childMenu}
                        onClose={this.closeMenu}
                    >
                        {this.state.labels.map((currentLabel, index) => (
                            <List onClick={(event) => this.addingLabelOnNote(event, index)} key={index}>
                                {currentLabel.labelName}
                            </List>
                        ))}
                    </Menu>
                    {/* REMINDER MENU */}
                    <Menu
                        anchorEl={anchorEl}
                        open={this.state.reminderMenu}
                        onClose={this.closeMenu}
                    >
                        <MenuItem id="ForFont">
                            Reminder :
                    </MenuItem>
                        <MenuItem id="ForFontOther" onClick={() => this.settingReminder(1)}>
                            <div id="ReminderItems"> Later today <span><Typography id="ForFontOther"> 8.00 PM</Typography></span></div>
                        </MenuItem>
                        <MenuItem id="ForFontOther" onClick={() => this.settingReminder(2)}>
                            <div id="ReminderItems"> Tommorrow <span><Typography id="ForFontOther"> 8.00 AM</Typography></span></div>
                        </MenuItem>
                        <MenuItem id="ForFontOther" onClick={() => this.settingReminder(3)}>
                            <div id="ReminderItems">Next week <span><Typography id="ForFontOther">  Mon, 8:00 AM</Typography></span></div>
                        </MenuItem>
                        <MenuItem id="ForFontOther" onClick={this.openReminderChildMenu}>
                            <div id="Remind"><span><MDtime /></span>  <span id="ForFontOther">Pick date & time</span> </div>
                        </MenuItem>
                    </Menu>

                    <Menu
                        anchorEl={anchorEl}
                        open={this.state.reminderChildMenu}
                        onClose={this.closeMenu}>
                        <MenuList>
                            <div id="dateTimeStyle">
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={this.state.userReminderDate}
                                    onChange={this.handleDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="Time"
                                    type="time"
                                    value={this.state.userReminderTime}
                                    onChange={this.handleTime}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button variant="contained"
                                    size="large"
                                    onClick={this.settingReminder}>save</Button>
                            </div>
                        </MenuList>
                    </Menu>
                </MuiThemeProvider>
            </div>
        )
    }
}