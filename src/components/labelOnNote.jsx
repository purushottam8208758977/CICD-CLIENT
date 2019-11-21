//labels list on a note 
import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export class LabelOnNote extends Component {
    render() {
        return (
            <div ><ListItem  button key="L">
                <ListItemIcon >
                    <ListItemText id="ItemText">
                    {this.props.data.labelName}
                    </ListItemText>
                </ListItemIcon>
            </ListItem></div>
        )
    }
}