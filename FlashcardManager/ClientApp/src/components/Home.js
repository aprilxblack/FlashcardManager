import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import ContinueIcon from '../images/continue-icon.png';
import SearchIcon from '../images/search-icon.png';
import PlusIcon from '../images/plus-icon.png';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.lastOpenedSetId = this.props.lastOpenedSetId;
        this.username = sessionStorage.getItem('Username');
    }
    openModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
    closeModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
  render () {
    return (
        <div>
            <h4 className="mb-3">Hi {this.username}! What would you like to do today?</h4>

            {this.lastOpenedSetId == null ? <><ActionBox displayText="Continue Learning" onClick={this.openModal} action="#" icon={ContinueIcon} /> </> :
                <> <ActionBox displayText="Continue Learning" action={"/study/" + this.lastOpenedSetId} icon={ContinueIcon} /> </>}
            <ActionBox displayText="Browse Sets" action="/browse-sets" icon={SearchIcon} />
            <ActionBox displayText="Create a Set" action="/create-a-set" icon={PlusIcon} /> 

            <div id="myModal" class="modal">

                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"></h5>
                            <button type="button" class="close" onClick={this.closeModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            You haven't opened any sets recently. Please select Browse Sets option instead.
                         </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.closeModal}>OK</button>
                        </div>
                    </div>
                </div>

            </div>
      </div>
    );
  }
}