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

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    NameCollection.update(this.props.nameEntry._id, {
      $set: { checked: !this.props.nameEntry.checked },
    });
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
    // Give nameCollection a different className when they are checked off,
    // so that we can style them nicely in CSS
    const nameEntryClassName = this.props.nameEntry.checked ? 'checked' : '';

    return (
      <li className={nameEntryClassName}>
      { this.props.cu ?
        <button className="delete" onClick={this.deleteThisNameEntry.bind(this)}>
        delete
        </button> : ''
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
      {/*
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.nameEntry.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        */}

      {!this.state.showDetails ?
          <span className="text">
          <strong>{this.props.nameEntry.username}</strong>: {this.props.nameEntry.item}
          </span>
          :
          <span className="text">
          <strong>{this.props.nameEntry.username}</strong>: {this.props.nameEntry.item}
          <p>Price: {this.props.nameEntry.price}</p>
          <p>Address: {this.props.nameEntry.address}</p>
          </span>
      }
      </li>
    );
  }
}
