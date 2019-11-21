import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {updateNote} from '../services/services'
import { ColorPopover } from './colorPopover'

export class OneArchiveNote extends Component {

    constructor(){
        super()
        this.ColorPopover = React.createRef()
    }
    componentDidMount(){ // this will enable the arvhive notes to refresh everytime  they are clicked
        this.handleRefresh()
    }
    handleRefresh = () => {
        this.props.refreshDisplay()
    }

    unarchiveTheNote=()=>{
        //initiating unarchiving process
        let unarchiveObject = {}
        unarchiveObject.noteId = this.props.data._id
        unarchiveObject.updating = { archive: false }

        updateNote(unarchiveObject).then((responseReceived) => {
            console.log("\n\n\t oneArchiveNote --> unarchive response--->", responseReceived)
            this.props.refreshDisplay()
            this.props.refreshNotes()
        })
    }

    openColorPallete = (event) => {
        console.log("\n\n\tOn color icon--archive-->")
        this.ColorPopover.current.handlePopoverOpen(event)
    }
    render() {
        return (
            <div id="NotesReceived">
                <Card id="NoteDimensions" style={{backgroundColor:this.props.data.color}}>
                    {this.props.data.title}<br />
                    {this.props.data.description}
                    <div id="icons">
                        <Button><img src={require('../assets/reminder.svg')} alt="reminder pic"></img> </Button>
                        <Button onClick={(event) => this.openColorPallete(event)}> <img src={require('../assets/pallete.svg')} alt="pallete pic"></img>  </Button>
                        <Button onClick={this.unarchiveTheNote}> <img src={require('../assets/unarchive.svg')} alt="unarchive pic"></img>  </Button>
                        <ColorPopover ref={this.ColorPopover} settingColor={this.props.data} refreshPostColorChange={this.handleRefresh}/>
                    </div></Card>
            </div>


        )
    }
}