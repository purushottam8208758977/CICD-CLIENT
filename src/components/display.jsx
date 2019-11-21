import React, { Component } from 'react';
import { allNotes, allReminders, allArchives, allTrash, labelledNotes } from '../services/services'
import Masonry from 'react-masonry-component'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//child component
import { SingleNote } from './singleNote'
import { OneTrashNote } from './oneTrashNote'
import { OneArchiveNote } from './oneArchiveNote'
import { OneReminderNote } from './oneReminderNote'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log("after drag array--> ", result)
    return result;
};


export class Display extends Component {
    displayContent;
    constructor() {
        super()
        this.state = {
            notes: [],
            archives: [],
            reminders: [],
            trash: [],
            searchedNotes: [],
            labelListing: [],
            openLoader: false
        }
    }
    /**
     * @description- This method is invoked just after the component is invoked
     */
    componentDidMount() {
        this.allNotesDisplaying()
        // this.allRemindersDisplaying()
        this.allArchivesDisplaying()
        this.allTrashDisplaying()
    }
    allNotesDisplaying = () => {
        this.setState({ openLoader: true })
        this.props.loadingInitiated(true) //start loading
        allNotes().then((responseReceived) => {
            console.log("\n\n\tAll notes received ---->", responseReceived.data.data)
            this.setState({ notes: responseReceived.data.data.reverse() })
            setTimeout(() => {
                this.setState({ openLoader: false })
                this.props.loadingInitiated(false) //end loading
            }, 1200);
            //console.log("-->",this.notes)
        })
    }
    allRemindersDisplaying = () => {
        this.setState({ openLoader: true })
        this.props.loadingInitiated(true) //start loading
        allReminders().then((responseReceived) => {
            console.log("\n\n\tAll Reminders received ---->", responseReceived.data.data)
            this.setState({ reminders: responseReceived.data.data })
            //console.log("-->",this.reminders)
            setTimeout(() => {
                this.setState({ openLoader: false })
                this.props.loadingInitiated(false) //end loading
            }, 1200);
        })
    }
    allArchivesDisplaying = () => {
        this.setState({ openLoader: true })
        this.props.loadingInitiated(true) //start loading
        allArchives().then((responseReceived) => {
            console.log("\n\n\tAll archives received ---->", responseReceived.data.data)
            this.setState({ archives: responseReceived.data.data })
            //console.log("-->",this.archives)
            setTimeout(() => {
                this.setState({ openLoader: false })
                this.props.loadingInitiated(false) //end loading
            }, 1200);
        })
    }
    allTrashDisplaying = () => {
        this.setState({ openLoader: true })
        this.props.loadingInitiated(true) //start loading
        allTrash().then((responseReceived) => {
            console.log("\n\n\t All Trash received ---->", responseReceived.data.data)
            this.setState({ trash: responseReceived.data.data })
            //console.log("-->",this.trash)
            setTimeout(() => {
                this.setState({ openLoader: false })
                this.props.loadingInitiated(false) //end loading
            }, 1000);
        })
        console.log("any...->")
    }
    allLabelsListing = (labelName) => {

        labelledNotes(labelName).then((listingResponse) => {
            console.log("\n\n\tListing response--->", listingResponse)
            this.setState({ labelListing: listingResponse.data.data })
            setTimeout(() => {
                this.setState({ openLoader: false })
                this.props.loadingInitiated(false) //end loading
            }, 1000);
        })
    }

    onDragEnd = result => {
        try {
            const { source, destination } = result;

            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId && destination !== null) {
                let afterDrag = reorder(
                    this.state.notes,
                    source.index,
                    destination.index
                )

                this.setState({ notes: afterDrag })

            }
        } catch (err) {
            console.log(err);

        }
    }

    render() {
        if (this.props.fetchNotes) {
            this.displayContent = this.state.notes.map((data, index) => {
                //console.log("\n\n\tdata of notes -->",data)
                return (
                    <div >
                        <Draggable
                            key={data._id}
                            draggableId={data._id}
                            index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >

                                    <SingleNote key={index}
                                        data={data}//props data sent to Single note component to access further 
                                        refreshDisplay={this.allNotesDisplaying}
                                        notesView={this.props.notesView}
                                    />
                                </div>
                            )}
                        </Draggable>
                    </div>
                )
            })
        }
        else if (this.props.fetchReminders) {
            this.displayContent = this.state.reminders.map((data, index) => {
                //console.log("\n\n\tdata of reminders -->",data)
                return (
                    <OneReminderNote key={index}
                        data={data}
                        refreshDisplay={this.allRemindersDisplaying}
                    />
                )
            })
        }
        else if (this.props.fetchArchives) {
            this.displayContent = this.state.archives.map((data, index) => {
                //console.log("\n\n\tdata of archives -->",data)
                return (
                    <OneArchiveNote key={index}
                        data={data}
                        refreshDisplay={this.allArchivesDisplaying}
                        refreshNotes={this.allNotesDisplaying}
                    />
                )
            })
        }
        else if (this.props.fetchTrash) {//trash fetchtrash : true
            this.displayContent = this.state.trash.map((data, index) => {
                //console.log("\n\n\tdata of trash -->",data)
                return (
                    <OneTrashNote key={index}
                        data={data}//passing the note data
                        refreshDisplay={this.allTrashDisplaying}
                        refreshNotes={this.allNotesDisplaying}
                    />
                )
            })
        }
        else if (this.props.searchNotes) {
            console.log("\n\n\tIn display")
            this.displayContent = this.props.searchNotes.map((data, index) => {
                //console.log("\n\n\tdata of trash -->",data)
                return (
                    <SingleNote key={index}
                        data={data}//props data sent to Single note component to access further 
                        refreshDisplay={this.allNotesDisplaying}
                    />
                )
            })
        }
        else { // fetchlabelledNotes 
            console.log("\n\n\tIn display")
            this.displayContent = this.state.labelListing.map((data, index) => {
                //console.log("\n\n\tdata of trash -->",data)
                return (
                    <SingleNote key={index}
                        data={data}//props data sent to Single note component to access further 
                        refreshDisplay={this.allNotesDisplaying}
                    />
                )
            })

        }
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div 
                                ref={provided.innerRef}>
                                {this.props.notesView ?
                                    <div id="ContentO"><Masonry>
                                        {this.displayContent}</Masonry>
                                    </div>
                                    :
                                    <div id="cardsSettled"><Masonry id="Content">
                                        {this.displayContent}</Masonry>
                                    </div>}
                            </div>)}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
