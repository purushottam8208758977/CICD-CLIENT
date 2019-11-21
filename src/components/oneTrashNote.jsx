import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import {deleteNote,updateNote} from '../services/services'
import Tooltip from '@material-ui/core/Tooltip';

export class OneTrashNote extends Component {

    componentDidMount(){
        this.handleRefresh()
    }
    handleRefresh=()=>{
        this.props.refreshDisplay()
    }

    deleteNoteForever=()=>{
        //initiating deleting process
        let deleteObject = {}
        deleteObject.noteId = this.props.data._id
        deleteNote(deleteObject).then((responseReceived) => {
            console.log("\n\n\t one Trash note --> deleting note response--->", responseReceived)
            this.props.refreshDisplay()
            this.props.refreshNotes()

        })
    }

    restoringNote=()=>{
        //initiating restoring process
        let restoreObject={}
        restoreObject.noteId=this.props.data._id
        restoreObject.updating={trash:false}
        updateNote(restoreObject).then((responseOfRestoringNote)=>{
            console.log("\n\n\tResponse of --> restoring-->",responseOfRestoringNote)
            this.props.refreshDisplay()
            this.props.refreshNotes()

        })
    }
    render() {
        return (
                <div id="NotesReceived">
                <Card id="NoteDimensions" style={{backgroundColor:this.props.data.color}}>
                   {this.props.data.title }<br/>
                   {this.props.data.description}
                   <Tooltip title="Delete Forever"><IconButton onClick={this.deleteNoteForever} id="deleteButton"><img id="deleteForever" src={require('../assets/deleteforever.png')} alt="delete pic"></img> </IconButton></Tooltip>
                   <Tooltip title="Restore"><IconButton onClick={this.restoringNote} ><img src={require('../assets/restore.svg')} alt="restore pic"></img> </IconButton></Tooltip>

                </Card>
                </div>
            

        )
    }
}