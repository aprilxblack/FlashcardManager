import React, { Component } from 'react';
import $ from 'jquery'; 

export class CreateFromFile extends Component {

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

        let data = new FormData();
        data.append('SetName', this.state.setName);
        data.append('UserID', sessionStorage.getItem('UserID'));
        data.append('Files', document.getElementById('csvFile').files[0])
        console.log(data);

        var handleResponse = (response) => {
            window.location.replace('/edit-set/' + response.setId)
        }

        $.ajax({
            url: 'set/create-from-csv',
            data: data,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                handleResponse(data)
            },
            error: function (xhr) {
                console.log(xhr);
           }
        });
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <p>Create from file </p>
                    <p class="text-danger">Note: only CSV files are accepted. It should consist of two columns: question (left) and answer (right). No headers. </p>
                    <form onSubmit={this.create}>
                        <input type="text" onChange={this.handleNameChange} className="form-control" placeholder="Set name" required />
                        <br />
                        <input type="file" id="csvFile" accept=".csv" required />
                        <br />
                        <br/>
                        <button type="submit" className="submit-button btn btn-primary">Create</button>
                    </form>
                </div>
            </>
        )
    }
}