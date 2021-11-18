import React, { Component } from "react";

import TutorialDataService from "../services/TutorialService";

export class Tutorial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTutorial: {
                id: null,
                title: "",
                description: "",
                published: false,
                createdAt: null,
                updatedAt: null
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
    }

    render() {
        const { currentTutorial } = this.state;

        return (
            <div>
                {
                    (() =>
                    {
                        if(currentTutorial) {
                            return (<div className="edit-form">
                            <h4>Tutorial</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={currentTutorial.title}
                                        onChange={this.onChangeTitle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={currentTutorial.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <strong>Status:</strong>
                                    </label>
                                    {currentTutorial.published ? "Published" : "Pending"}
                                </div>
                            </form>

                            <button onClick={() => this.updatePublished(!currentTutorial.published)}>{currentTutorial.published ? 'UnPublish' : 'Publish'}</button>

                            <button onClick={this.deleteTutorial}>Delete</button>

                            <button type="submit" onClick={this.updateTutorial}>Update</button>
                            <p>{this.state.message}</p>
                        </div>)
                        }
                        else {
                            return(<div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>);
                        }
                    })()
                }
            </div>
        );
    }

    onChangeTitle = (e) => {
        const title = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                title
            }
        }));
    }

    onChangeDescription = (e) => {
        const description = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description
            }
        }));
    }

    getTutorial = async (id) => {
        try{
            let response = await TutorialDataService.get(id);
            this.setState({currentTutorial: response.data});
            console.log(response.data);
        }
        catch(e) {
            console.log(e);
        }
    }

    updatePublished = async (status) => {
        console.log('Upd called');
        let tutorial = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            createdAt: this.state.currentTutorial.createdAt,
            published: status
        };

        try {
            let obj = await TutorialDataService.update(tutorial);
            console.log(obj.data);
            await this.setState({currentTutorial: obj.data});
        }
        catch (e)
        {
            console.log(e);
        }
    }

    updateTutorial = async () => {
        let response = await TutorialDataService.update(this.state.currentTutorial);
        try{
            console.log(response.data);
            this.setState({
                message: "The tutorial was updated successfully!"
            });
        }
        catch(e)
        {
            console.log(e);
        }
    }

    deleteTutorial = async () => {
        let response = await TutorialDataService.delete(this.state.currentTutorial.id);
            try {
                console.log(response.data);
                this.props.history.push('/tutorials')
            }
            catch(e) {
                console.log(e);
            };
    }
}