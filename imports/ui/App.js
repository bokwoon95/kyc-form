import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { NameCollection } from '../api/nameCollection.js';

import NameEntry from './NameEntry.js';
// import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>
            Name Screening Database thingo
          </h1>
        </header>

        <form autocomplete="off">
          <ul className="form-style-1">
            <li>
              <label>
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="field1"
                className="field-divided"
                placeholder="First Name"
              />
              &nbsp;
              <input
                type="text"
                name="field2"
                className="field-divided"
                placeholder="Last Name"
              />
            </li>
            <li>
              <label>Country of Citizenship <span className="required">*</span></label>
              <input
                type="email"
                name="field3"
                className="field-long"
              />
            </li>
            {/*
            <li>
              <label>Subject</label>
              <select name="field4" className="field-select">
                <option value="Advertise">Advertise</option>
                <option value="Partnership">Partnership</option>
                <option value="General Question">General</option>
              </select>
            </li>
            */}
            <li>
              <input type="submit" value="Submit" />
            </li>
          </ul>
        </form>
        <ul>
          <li></li>
          {/*<li>hey</li>
          <li>friendo</li>*/}
          {/*this.renderNameCollection*/}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    nameCollection: NameCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: NameCollection.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
