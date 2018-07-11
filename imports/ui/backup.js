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
      hideCompleted: false,
      shouldShowForm: false,
      searchBarText: '',
      currentuzer: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    NameCollection.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleSubmitv2(event) {
    event.preventDefault();
    console.log(event);

    const item = ReactDOM.findDOMNode(this.refs.itemInput).value.trim();
    // const condition = ReactDOM.findDOMNode(this.refs.conditionInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const address = ReactDOM.findDOMNode(this.refs.addressInput).value.trim();

    NameCollection.insert({
      item,
      price,
      address,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
      name: Meteor.user().name,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.itemInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
    ReactDOM.findDOMNode(this.refs.addressInput).value = '';
  }

  toggleForm() {
    this.setState({
      shouldShowForm: !this.state.shouldShowForm,
    });
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderNameCollection() {
    let filteredNameCollection = this.props.nameCollection;
    return filteredNameCollection.map((nameEntry) => (
      <NameEntry key={nameEntry._id} nameEntry={nameEntry} cu={this.props.currentUser} />
    ));
  }

  onInputChange(evt) {
    event.preventDefault();
    console.log(evt.target.value);
    this.setState({
      searchBarText : evt.target.value,
    });
  }

  onNameEnter(evt) {
    event.preventDefault();
    let namajeff = ReactDOM.findDOMNode(this.refs.ownerName).value.trim();
    console.log(namajeff);
    console.log(Meteor.userId());
    Meteor.users.update(Meteor.userId(), {
      $set: {
        name: namajeff
      }
    });
  }

  render() {
    return (
      <div className="container">
      <header>

      { this.props.currentUser ?
        this.state.shouldShowForm ?
        <div>
        <button onClick={this.toggleForm.bind(this)}>
        Close Entry
        </button>
        <form onSubmit={this.handleSubmitv2.bind(this)}>
        <input
        type="text"
        ref="itemInput"
        placeholder="Item name"
        />

        <input
        type="text"
        ref="priceInput"
        placeholder="Price"
        />

        <input
        type="text"
        ref="addressInput"
        placeholder="Pickup Address"
        />
        <button>Submit</button>
        </form>
        </div>
        :
        <div>
        <button onClick={this.toggleForm.bind(this)}>
        New Entry
        </button>
        </div>
        :
        ''
      }
      </header>

      <ul>
      {this.renderNameCollection()}
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
