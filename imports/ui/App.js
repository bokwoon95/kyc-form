import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { NameCollection } from '../api/nameCollection.js';

import NameEntry from './NameEntry.js';
// import AccountsUIWrapper from './AccountsUIWrapper.js';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

// Heroku Test
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
      // startDate: new Date("1/1/2000")
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
                name="firstnamefield"
                className="field-divided"
                placeholder="First Name"
              />
              &nbsp;
              <input
                type="text"
                name="middlenamefield"
                className="field-divided"
                placeholder="Middle Name"
                autocomplete="off"
              />
              &nbsp;
              <input
                type="text"
                name="lastnamefield"
                className="field-divided"
                placeholder="Last Name"
              />
              <br />
              <br />
              <label>Country of Citizenship <span className="required">*</span></label>
              <input
                type="text"
                name="citizenshipfield"
                className="field-long"
              />
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
            <br />
            <br />
            <label> Date of Birth <span className="required">*</span></label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form>
      <ul>
        <li><b>hey</b> <button className="delete" type="button" value="Show more">show details</button></li>
        <li><b>friendo</b> <button className="delete" type="button" value="Show more">show details</button></li>
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
