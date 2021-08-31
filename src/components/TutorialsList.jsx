import React, { Component } from "react";
import { Link } from "react-router-dom";

import TutorialDataService from "../services/TutorialService";

export class TutorialsList extends Component {
    constructor(props) {
        super(props);

        this.state = {//redux,mobX
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-12">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>

                    <ul className="list-group">
                        {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <li//tutorial list item
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : index)
                                }
                                onClick={() => this.setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn-primary btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {
                        (() =>
                        {
                            if (currentTutorial)
                            {
                                return (<div>
                                        <h4>Tutorial</h4>
                                        <div>
                                            <label>
                                                <strong>Id:</strong>
                                            </label>{" "}
                                            {currentTutorial.id}
                                        </div>
                                        <div>
                                            <label>
                                                <strong>Title:</strong>
                                            </label>{" "}
                                            {currentTutorial.title}
                                        </div>
                                        <div>
                                            <label>
                                                <strong>Description:</strong>
                                            </label>{" "}
                                            {currentTutorial.description}
                                        </div>
                                        <div>
                                            <label>
                                                <strong>Status:</strong>
                                            </label>{" "}
                                            {currentTutorial.published ? "Published" : "Pending"}
                                        </div>
                                        <div>
                                            <label>
                                                <strong>CreatedAt:</strong>
                                            </label>{" "}
                                            {new Intl.DateTimeFormat('en-GB', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric'
                                            }).format(new Date(Date.parse(currentTutorial.createdAt)))}
                                        </div>
                                        <Link to={"/tutorials/" + currentTutorial.id} className="badge badge-warning">
                                            <button type="button" class="btn btn-warning">Edit</button>
                                        </Link>
                                    </div>)
                            }
                            else
                            {
                                return (<div>
                                        <br />
                                        <p>Please click on a Tutorial...</p>
                                    </div>)
                            }
                        } )()
                    }
                </div>
            </div>
        );
    }

    onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;

        this.setState({searchTitle});
    }

    retrieveTutorials = async() => {
        let response = await TutorialDataService.getAll();
        try {
            this.setState({tutorials: response.data});
            console.log(response.data);//sentry (logging)
        }
        catch(e) {
            console.log(e);
        };
    }

    refreshList = async() => {
        await this.retrieveTutorials();
        this.setState({currentTutorial: null, currentIndex: -1});
    }

    setActiveTutorial = (tutorial, index) => {
        this.setState({currentTutorial: tutorial, currentIndex: index});
    }

    removeAllTutorials = async() => {
        let response = await TutorialDataService.deleteAll();
        try{
            console.log(response.data);
            await this.refreshList(); //set empty state//Initialize
        }
        catch(e) {
            console.log(e);
        };
    }
}
