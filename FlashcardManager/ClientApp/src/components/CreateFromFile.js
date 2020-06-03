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
        const data = JSON.stringify({
            Name: this.state.setName,
            UserID: sessionStorage.getItem('UserID')
        })

        var handleResponse = (response) => {
            window.location.replace('/edit-set/' + response.toString())
        }

        $.ajax({
            type: "POST",
            url: "set/create",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("RequestVerificationToken",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            dataType: "json",
            data: data,
            error: function (xhr) {
                console.log(xhr);
            },
            success: handleResponse
        });
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <p>Create from file </p>
                </div>
            </>
        )
    }
}