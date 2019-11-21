import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core' // overiding default css properties
import Card from '@material-ui/core/Card';
import { IconsList } from './iconsList';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close'
import { deleteLabelOnNote, updateNote } from '../services/services'

//child components
import { DialogNote } from './dialogNote'

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


const theme = createMuiTheme({
    overrides: {
        "MuiChip": {
            "deleteIcon": {
                "height": "15px"
            }
        },
    }
})



export class SingleNote extends Component {

    constructor() {
        super()
        this.classes = useStyles.bind(this);
    }
    state = {
        open: false,
        labelName: null,
        checkLabel: false,

    };

    handleRefresh = () => {
        this.props.refreshDisplay()
    }

    handleClickOpen = () => {
        //console.log("label name--->",this.props.data.label[0].labelName)
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    removingLabelOnNote = (event, index) => {
        //initiating removing label process on note 

        let labelObject = {}
        labelObject.noteId = this.props.data._id
        labelObject.labelId = this.props.data.label[index]._id
        console.log("\n\nlabel  --->", this.props.data.label[index]._id)
        deleteLabelOnNote(labelObject).then((deletedLabelResponse) => {
            console.log("\n\n\tAfter deleting label response")
            this.props.refreshDisplay()
        })
    }
    removingReminderOnNote = () => {
        let reminderObject = {}
        reminderObject.noteId = this.props.data._id
        reminderObject.updating = { reminder: "" }
        updateNote(reminderObject).then((response) => {
            console.log(`\n\n\t Response --> ${response} `)
            this.props.refreshDisplay()
        })

    }
    render() {
        let reminderToDisplay = this.props.data.reminder
        reminderToDisplay = reminderToDisplay.toString()
        let words = reminderToDisplay.split(' ')
        let displayingDate = words[1] + " " + words[2] + " " + words[4]
        //let todaysDate = new Date();
        // console.log(Date.parse(todaysDate))
        // let parsedTodaysDate=Date.parse(todaysDate)
        //console.log(Date.parse(this.props.data.reminder))  
        //let parsedReminder=Date.parse(this.props.data.reminder)
        //console.log(parsedReminder-parsedTodaysDate)

        return (
            <div id="NotesReceived">
                <MuiThemeProvider theme={theme}>
                    {this.props.notesView ?
                        <Card id="NoteDimensionsO" style={{ backgroundColor: this.props.data.color }}>
                            <div onClick={this.handleClickOpen} id="SingleNote">
                                {this.props.data.title}<br />
                                {this.props.data.description}</div>

                            {this.props.data.reminder !== "" && <Chip
                                className={this.classes.root}
                                label={displayingDate}
                                variant="outlined"
                                deleteIcon={<CloseIcon />}
                            />}
                            <div id="manageLabels"> {this.props.data.label.map((label, index) => (
                                <div id="LabelOnNote" style={{ marginRight: "165px" }}>
                                    <Chip
                                        className={this.classes.root}
                                        label={label.labelName}
                                        variant="outlined"
                                        onClick={this.clickedLabel}
                                        onDelete={() => this.removingLabelOnNote(index)}
                                        deleteIcon={<CloseIcon />}
                                    />
                                </div>
                            ))}</div>
                            <IconsList individualNoteData={this.props.data} refreshing={this.handleRefresh} />
                        </Card>
                        :
                        // <Draggable
                        //     draggableId={this.props.hero.id}
                        //     index={this.props.index}
                        // >
                            <Card id="NoteDimensions" style={{ backgroundColor: this.props.data.color }}>

                                <div id="SingleNote" onClick={this.handleClickOpen}>
                                    {this.props.data.title}<br />
                                    {this.props.data.description}</div>
                                <div id="ReminderChip">{this.props.data.reminder !== "" && <Chip
                                    className={this.classes.root}
                                    label={displayingDate}
                                    variant="outlined"
                                    onDelete={() => this.removingReminderOnNote()}
                                    deleteIcon={<CloseIcon />}
                                />}</div>


                                <div id="manageLabels"> {this.props.data.label.map((label, index) => (
                                    <div id="LabelOnNote" style={{ marginRight: "165px" }}>
                                        <Chip
                                            className={this.classes.root}
                                            label={label.labelName}
                                            variant="outlined"
                                            onClick={this.clickedLabel}
                                            onDelete={(event) => this.removingLabelOnNote(event, index)}
                                            deleteIcon={<CloseIcon />}
                                        />
                                    </div>
                                ))}</div>
                                <IconsList individualNoteData={this.props.data} refreshing={this.handleRefresh} />
                            </Card>}
                            {/* </Draggable> */}
                            
                      
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <DialogNote dialogData={this.props.data} closeDialog={this.handleClose} refreshAfterEditing={this.handleRefresh} />
                        </Dialog>
                </MuiThemeProvider>
            </div >
        )
    }
}