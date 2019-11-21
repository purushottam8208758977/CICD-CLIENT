//one reminder note only

import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

export class OneReminderNote extends Component {

    componentDidMount(){
        this.handleRefresh()
    }
    handleRefresh=()=>{
        this.props.refreshDisplay()
    }
    render() {
        return (
                <div id="NotesReceived">
                <Card id="NoteDimensions" style={{backgroundColor:this.props.data.color}}>
                   {this.props.data.title }<br/>
                   {this.props.data.description}
                </Card>
                </div>
            

        )
    }
}