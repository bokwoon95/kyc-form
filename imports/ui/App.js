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

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedDate: '',
      currentEntry: {
        name: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        citizenship: '',
        dob: '',
      },
      doFilterSearch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.activateSearch = this.activateSearch.bind(this);
    this.deactivateSearch = this.deactivateSearch.bind(this);
  }

  // updates this.state whenever the user modifies one of the following form fields:
  // • First Name
  // • Middle Name
  // • Last Name
  // • Country of Citizenship
  // does NOT include the 'Date of Birth Field'. That is handled by 'handleDateChange()'
  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    console.log("name: " + evt.target.name);
    console.log("value: " + evt.target.value);
    console.log("");
    if (name === 'firstnamefield') {
      const newState = Object.assign({}, this.state);
      newState.currentEntry.name.firstName = value;
      this.setState(newState);
      console.log("Current Form State:");
      console.log(JSON.stringify(this.state));
    }
    else if (name === 'middlenamefield') {
      const newState = Object.assign({}, this.state);
      newState.currentEntry.name.middleName = value;
      this.setState(newState);
      console.log("Current Form State:");
      console.log(JSON.stringify(this.state));
    }
    else if (name === 'lastnamefield') {
      const newState = Object.assign({}, this.state);
      newState.currentEntry.name.lastName = value;
      this.setState(newState);
      console.log("Current Form State:");
      console.log(JSON.stringify(this.state));
    }
    if (name === 'citizenshipfield') {
      const newState = Object.assign({}, this.state);
      newState.currentEntry.citizenship = value;
      this.setState(newState);
      console.log("Current Form State:");
      console.log(JSON.stringify(this.state));
    }
    else if (name === 'crimesfield') {
      const newState = Object.assign({}, this.state);
      newState.currentEntry.notableActivity = value;
      this.setState(newState);
      console.log("Current Form State:");
      console.log(JSON.stringify(this.state));
    }
  }

  // Updates this.state whenever the user changes the DOB form field
  handleDateChange(date) {
    console.log(date.target);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    console.log("formatted date:");
    console.log(formattedDate);
    const newState = Object.assign({}, this.state);
    newState.displayedDate = date;
    newState.currentEntry.dob = formattedDate;
    this.setState(newState);
  }

  // Tagged to the 'Add Entry' button
  // Helper function that adds the current person into the db
  // Only temporary
  addNewEntry(evt) {
    const firstName = this.state.currentEntry.name.firstName;
    const middleName = this.state.currentEntry.name.middleName;
    const lastName = this.state.currentEntry.name.lastName;
    let fullName = (middleName === "") ? firstName + " " + lastName :
      firstName + " " + middleName + " " + lastName;
    NameCollection.insert({
      name: {
        firstName: this.state.currentEntry.name.firstName,
        middleName: this.state.currentEntry.name.middleName,
        lastName: this.state.currentEntry.name.lastName,
        fullName: fullName.trim(),
      },
      citizenship: this.state.currentEntry.citizenship,
      dob: this.state.currentEntry.dob,
    });
  }

  // Tagged to the 'Search' button
  // Expected behavior: when pressed, the current this.state will be checked against the database for any matches
  // Internally this should set a
  activateSearch(event) {
    event.preventDefault();
    this.setState({
      doFilterSearch: true,
    });
    console.log("Current Form State:");
    console.log(JSON.stringify(this.state));
    console.log(typeof this.props.nameCollection);
    // console.log("Current Database State:");
    // console.log(JSON.stringify(this.props.nameCollection));

    // var search = new RegExp(search_text, 'i');
    // var ss=Jobs.find({'J_Headline': search}).count();
    // console.log(ss);
  }

  deactivateSearch(event) {
    event.preventDefault();
    this.setState({
      doFilterSearch: false,
    });
  }

  renderNameCollection() {
    let filteredNameCollection = this.props.nameCollection;
    let firstName = this.state.currentEntry.name.firstName;
    let middleName = this.state.currentEntry.name.middleName;
    let lastName = this.state.currentEntry.name.lastName;

    if (this.state.doFilterSearch) {
      console.log("First Name: " + firstName);
      console.log("Last Name: " + lastName);
      filteredNameCollection.forEach(
        function(entry) {
          console.log("Full Name: " + entry.name.fullName.toLowerCase());
        }
      );
      filteredNameCollection = filteredNameCollection.filter(
        (entry) =>
        entry.name.fullName.toLowerCase().indexOf(firstName.toLowerCase()) !== -1
        &&
        entry.name.fullName.toLowerCase().indexOf(lastName.toLowerCase()) !== -1
      );
    }

    console.log("this is nameCollection:");
    console.log(JSON.stringify(this.props.nameCollection));
    console.log("");
    return filteredNameCollection.map((nameEntry) => (
      <div>
        <NameEntry key={nameEntry._id} nameEntry={nameEntry} />
      </div>
    ));
  }

  render() {
    let filteredNameCollection = this.props.nameCollection;
    return (
      <div className="container">
        <header>
          <h1>
            Name Screening Database thingo
          </h1>
        </header>

        <form
          onSubmit={this.activateSearch}
          autoComplete="off"
        >
          <ul className="form-style-1">
            <label> Full Name </label>
            <input
              type="text"
              name="firstnamefield"
              className="field-divided"
              placeholder="First Name"
              autoComplete="off"
              onChange={this.handleChange}
            />
            &nbsp;
            <input
              type="text"
              name="middlenamefield"
              className="field-divided"
              placeholder="Middle Name"
              autoComplete="off"
              onChange={this.handleChange}
            />
            &nbsp;
            <input
              type="text"
              name="lastnamefield"
              className="field-divided"
              placeholder="Last Name"
              autoComplete="off"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <label> Country of Citizenship </label>
            <input
              type="text"
              name="citizenshipfield"
              className="field-long"
              autoComplete="off"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <label> Date of Birth </label>
            <DatePicker
              name="datefield"
              selected={this.state.displayedDate}
              onChange={this.handleDateChange}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            <br />
            <label> Notable Activity (for adding entries only)</label>
            <input
              type="text"
              name="crimesfield"
              autoComplete="off"
              onChange={this.handleChange}
            />
            <br />
            <br />
            {this.state.doFilterSearch ?
                <button
                  className="buttonYee"
                  onClick={this.deactivateSearch.bind(this)}
                >
                  Deactivate Search
                </button>
                :
                <button
                  className="buttonRee"
                  onClick={this.activateSearch.bind(this)}
                >
                  Activate Search
                </button>
            }
            &nbsp;<button className="buttonGee" onClick={this.addNewEntry.bind(this)}>Add Entry</button>
          </ul>
        </form>
        <ul>
          <li></li>
          {this.renderNameCollection()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    nameCollection: NameCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
