import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { getRecipes } from '../../actions/recipes';
import { getMemberData } from '../../actions/member';
import { Icon } from 'native-base';
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
      <TouchableOpacity style={{width: '100%', height: '100%'}} >
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
              animationType='slide'
              transparent={true}>
                <TouchableOpacity onPress={() => this.setState({modalVisible: false})} style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  <View style={{width: '100%', height: '16%', backgroundColor: '#f5f5f5'}}>
                    <View style={{width: '100%', bottom: 0, position: 'absolute', paddingLeft: 15}}>
                      <Text style={{fontWeight: '700', fontSize: 20, paddingBottom: 10}}> Full Name: <Text style={{fontWeight: '300'}}>{this.state.user.name}</Text> </Text>
                      <Text style={{fontWeight: '700', fontSize: 20, paddingBottom: 15}}> Email: <Text style={{fontWeight: '300'}}>{this.state.user._id}</Text> </Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
