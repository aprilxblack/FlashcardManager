import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import PlusIcon from '../images/plus-icon.png';
import DeleteIcon from '../images/delete-icon.png';
import EditIcon from '../images/edit-icon.png';

export class BrowseSets extends Component {

    constructor(props) {
        super(props);
        this.userId = sessionStorage.getItem('UserID');
        this.state = {
            sets: [],
            loading: true
        }
    }

    componentDidMount() {
        this.populateUserSets();
    }

    async populateUserSets() {
        const response = await fetch("set/browse?userId=" + this.userId);
        const data = await response.json();
        this.setState({
            sets: data.sets,
            loading: false
        })
    }

    static renderUserSets(sets) {
        const showAlert = (setId) => {
            console.log(setId)
            var modal = document.querySelector('#deleteModal');
            modal.style.display = "block";
            var hidden = document.querySelector('#setToDelete');
            hidden.value = setId;
        }

        return (
            <div className="mb-3">
                {
                    sets.length > 3 && (
                        <>
                            <h5 className="mb-3 text-center">(scroll down to see more)</h5>
                        </>
                    )
                }
                {
                    sets.map((set, i) => (
                        <>
                        <ActionBox displayText={set.name} action={"/study/" + set.id} style={{ display: "inline-block" }} />
                            <div className="button-container mb-2" style={{ display: "table", margin: "0 auto" }}>
                                <a href={"/edit-set/" + set.id}><img className="icon mr-2" src={EditIcon} style={{ display: "inline-block" }} /></a>
                                <span onClick={() => showAlert(set.id)}><img className="icon" src={DeleteIcon} style={{ display: "inline-block", cursor: "pointer" }} /> </span>
                         </div>
                       </>
                    ))
                }
                {
                    sets.length == 0 && (
                        <>
                            <h4 className="mt-3 text-center">You have no sets! Would you like to create one? </h4>
                        </>
                    )
                }
            </div>
        )
    }

    hideAlert() {
        var modal = document.querySelector('#deleteModal');
        modal.style.display = "none";
    }

    async deleteSet() {
        var modal = document.querySelector('#deleteModal');
        modal.style.display = "none";
        var idToDelete = document.querySelector('#setToDelete').value;
        const response = await fetch('set/delete?id=' + idToDelete, {
            method: 'DELETE'
        }).then(function (response) {
            window.location.reload();
        })
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : BrowseSets.renderUserSets(this.state.sets);
        return (
            <div>
                <h4 className="mb-2 text-center">Click on a set to study:</h4>
                {contents}
                <ActionBox icon={PlusIcon} displayText="Add a new set" action="/create-a-set" />
                <div className="mb-10"> </div>

                <div id="deleteModal" class="modal">

                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" class="close" onClick={this.hideAlert} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete this set? This cannot be undone.
                                <input type="hidden" value="" id="setToDelete"/>
                         </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={this.deleteSet}>Yes</button>
                                <button type="button" class="btn btn-secondary" onClick={this.hideAlert}>No</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}