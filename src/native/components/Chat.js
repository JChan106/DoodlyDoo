import React from 'react';
import { View, Container, Content, Text } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { getRecipes } from '../../actions/recipes';
import { getMemberData } from '../../actions/member';

class Chat extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isOwner: false,
    };
  }

  componentDidMount() {
    that = this;
    let emailKey = this.props.recipe.masterEmail.replace(/[.]/g, ',');
    let appointmentMessages = FirebaseRef.child('messages').child(emailKey).child(this.props.recipe.id);
    appointmentMessages ? appointmentMessages.on('value', (snapshot) => {
      that.setState({messages: snapshot.val()});
    }) : null
  }

  onSend(messages = []) {
    let emailKey = this.props.recipe.masterEmail.replace(/[.]/g, ',');
    let appointmentMessages = FirebaseRef.child('messages').child(emailKey).child(this.props.recipe.id);
    if (appointmentMessages) {
      // console.log(messages.concat(this.state.messages));
      appointmentMessages.set(messages.concat(this.state.messages));
    }
  }

  render() {
    const { loading, error, success, member } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
          <GiftedChat
            messages={this.state.messages}
            keyboardShouldPersistTaps='never'
            submitOnReturn={true}
            bottomOffset={48}
            onSend={(messages) => {
              // let temp = `${member.firstName} ${member.lastName} \n${messages[0].text}`;
              // messages[0].text = temp;
              // console.log(messages);
              this.onSend(messages);
              }}
            user={{
              name: `${member.firstName} ${member.lastName}`,
              _id: member.signedUp
            }}
          />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
