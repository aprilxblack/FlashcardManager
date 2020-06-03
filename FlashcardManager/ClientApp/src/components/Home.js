import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import ContinueIcon from '../images/continue-icon.png';
import SearchIcon from '../images/search-icon.png';
import PlusIcon from '../images/plus-icon.png';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.username = sessionStorage.getItem('Username');
        this.userId = sessionStorage.getItem('UserID');
        this.state = {
            username: null,
            lastOpenedSetId: null,
            loading: true
        }
        //binding methods with the class
        this.fetchUserData = this.fetchUserData.bind(this);
        Home.renderHomepage = Home.renderHomepage.bind(this);
    }
    //toggle popup display
    openModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
    closeModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    componentDidMount() {
        this.fetchUserData();
    }

    async fetchUserData() {
        const response = await fetch("user/get-data?userId=" + this.userId);
        const data = await response.json();
        this.setState({
            username: data.username,
            lastOpenedSetId: data.lastOpenedSetId,
            loading: false
        })
    }

    static renderHomepage() {
        return (
            <>
                <h4 className="mb-3">Hi {this.username}! What would you like to do today?</h4>

                {this.state.lastOpenedSetId == null ? <><ActionBox displayText="Continue Learning" onClick={this.openModal} action="#" icon={ContinueIcon} /> </> :
                    <>
                        <a href={"/study/" + this.state.lastOpenedSetId}>
                            <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" >
                                Continue Learning
                                <img src={ContinueIcon} className="icon ml-2 mr-2 float-left" />
                            </div>
                        </a>        
                    </>}
                        
                        
                <ActionBox displayText="Browse Sets" action="/browse-sets" icon={SearchIcon} />
                <ActionBox displayText="Create a Set" action="/create-a-set" icon={PlusIcon} />

                <div id="myModal" class="modal">

                    <div className="modal-dialog" role="document">
                        <div class="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                You haven't opened any sets recently. Please select Browse Sets option instead.
                         </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>OK</button>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderHomepage();
      return (
          <div>
              {contents}
          </div>
    );
  }
}