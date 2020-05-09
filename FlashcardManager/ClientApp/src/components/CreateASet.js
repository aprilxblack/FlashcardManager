import React, { Component } from 'react';

export class CreateASet extends Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.create = this.create.bind(this);
        this.state = {
            setName: ''
        }
    }
    handleNameChange(e) {
        this.setState({
            setName: e.target.value
        });
    }
    create(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <form onSubmit={this.create}>
                        <h4 className="mb-3 text-center">Enter a name for your new set:</h4>
                        <input type="text" onChange={this.handleNameChange} className="form-control" placeholder="enter name here" required />
                        <br />
                        <button type="submit" className=" submit-button btn btn-primary">Create</button>
                    </form>
                </div>
            </>
        )
    }
}