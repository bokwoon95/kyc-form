import React, { Component } from 'react';

import { NameCollection } from '../api/nameCollection.js';

// NameEntry component - represents a single todo item
export default class NameEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
    };
  }

  deleteThisNameEntry() {
    NameCollection.remove(this.props.nameEntry._id);
  }

  showThisNameEntry() {
    this.setState({
      showDetails: true
    });
  }

  hideThisNameEntry() {
    this.setState({
      showDetails: false
    });
  }

  render() {
    return (
      <li>
        {this.props.adminMode ?
            <button className="delete" onClick={this.deleteThisNameEntry.bind(this)}>
              delete
            </button>
            :
            ''
        }
        {this.state.showDetails ?
            <button className="delete" onClick={this.hideThisNameEntry.bind(this)}>
              hide
            </button>
            :
            <button className="delete" onClick={this.showThisNameEntry.bind(this)}>
              show
            </button>
      }

      {!this.state.showDetails ?
          <span className="text">
            <strong>{this.props.nameEntry.name.fullName}</strong>
          </span>
          :
          <span className="text">
            <strong>{this.props.nameEntry.name.fullName}</strong>
            <p><b>Citizenship:</b> {this.props.nameEntry.citizenship}</p>
            <p><b>DOB:</b> {this.props.nameEntry.dob}</p>
            <p><b>Notable Activity:</b> {this.props.nameEntry.notableActivity}</p>
          </span>
      }
      </li>
    );
  }
}
