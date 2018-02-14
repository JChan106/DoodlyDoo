import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { getRecipes } from '../../actions/recipes';
import { getMemberData } from '../../actions/member';
import { Button, View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';


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
      modalVisible: false,
      showName: false,
      user: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(user) {
    this.setState({modalVisible: !this.state.modalVisible, user: user});
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
      appointmentMessages.set(messages.concat(this.state.messages));
    }
  }

  render() {
    const { loading, error, success, member } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <View>
      <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => this.setState({modalVisible: false})}>
            <GiftedChat
              messages={this.state.messages}
              keyboardShouldPersistTaps='always'
              submitOnReturn={true}
              bottomOffset={48}
              showUserAvatar={true}
              onPressAvatar={(user) => this.toggleModal(user)}
              onSend={(messages) => {
                this.onSend(messages);
                }}
              user={{
                name: `${member.firstName} ${member.lastName}`,
                _id: member.email
              }}
            />
            { this.state.modalVisible ?

              <Modal isVisible={this.state.modalVisible}
              onRequestClose={() => this.toggleModal()}
              transparent={true}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080', opacity: 50}}>
                  <View style={{width: '85%', height: '60%', backgroundColor: 'white'}}>
                    <Text> {this.state.user.name} </Text>
                    <Text> {this.state.user._id} </Text>
                  </View>
                </View>
              </Modal> : null }
        </TouchableOpacity>
        </View>
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
