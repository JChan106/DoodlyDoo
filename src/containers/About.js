import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppLoading, Asset } from 'expo';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import { Firebase, FirebaseRef } from '../lib/firebase';
import { logout, getMemberData, getFriendRequests, getMessages } from '../actions/member';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class About extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    getFriendRequests: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      newInvitedAppointments: new Array(),
    };
  }

  componentDidMount = () => {
    this.props.getMemberData();
    this.props.getFriendRequests();
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      loggedIn ? FirebaseRef.child('invitedAppointments').child(loggedIn.email.replace(/[.]/g, ',')).on('value', (snapshot) => {
        tempArray = new Array();
        if (snapshot.val()) {
          Object.entries(snapshot.val()).map(([key, value]) => {
            if (!value['read']) {
              tempArray.push(value);
            }
          });
        }
        this.setState({newInvitedAppointments: tempArray});
      }) : null
    });
    let name = `${this.props.member.firstName} ${this.props.member.lastName}`;
    this.props.getMessages(this.props.recipes.recipes, name);
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      'https://media.giphy.com/media/3o7WIx6QRwSer4HyH6/giphy.gif',
      'https://media.giphy.com/media/3o7WIMspZUYI8Tdhjq/giphy.gif',
      'https://media.giphy.com/media/l0NgSywq4eYMU6G8o/giphy.gif',
    ]);

    await Promise.all([...imageAssets]);
  }

  render = () => {
    const { Layout, member, memberLogout, recipes } = this.props;

    let tempArray = recipes.recipes;
    tempArray = tempArray.filter(x => {
      if (x && x.meetupDate) {
        let compareAppointmentDate = moment(x.meetupDate).format('LL');
        let inOneDay = moment().format('LL') === compareAppointmentDate
        return x != null && x.meetupDate != null && x.meetupTime != null && inOneDay;
      }
    });

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    } else {
      return <Layout member={member} logout={memberLogout} recipes={tempArray} newRecipes={this.state.newInvitedAppointments}/>;
    }
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  getMemberData,
  getFriendRequests,
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
