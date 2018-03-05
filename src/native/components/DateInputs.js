import React from 'react';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { Container, Icon, Button, View, Text, Modal, Card, CardItem, List, Content, ListItem, Body, Separator} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Colors from '../../../native-base-theme/variables/commonColor';


class DateInputs extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputtedInfo: null,
      showMessage: true,
    };
  }

  componentWillMount() {
    that = this;
    let recipeInfo = this.props.recipes.recipe;
    FirebaseRef.child('appointments').child(recipeInfo.masteruid).child(recipeInfo.id).child('userDates').once('value', (snapshot) => {
      that.setState({inputtedInfo: snapshot.val()});
    });
  }

  componentDidMount () {
    Object.values(this.state.inputtedInfo).map((value) => {
      if (value[this.props.date]) {
        this.setState({showMessage: false});
      }
    });
  }

  printInputs = (object) => object ? Object.entries(object).map(([key, value]) => (
    <View>
      {
      value[this.props.date] ?
      <ListItem itemHeader>
          <Text>{key}</Text>
       </ListItem> : null
      }
       {
         Object.entries(value).map(([date, timesArray]) => {
           if (this.props.date === date) {
             return timesArray.map((times) => (
                    <ListItem key={key} rightIcon={{ style: { opacity: 0 } }}>
                       <Text>{times.start} - {times.end}</Text>
                    </ListItem>
                  ));
          }
        })
      }
     </View>
   )) : null

  render() {
    const { recipes, member } = this.props;

    return (
        <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
          <List>
            {this.printInputs(this.state.inputtedInfo)}
            {this.state.showMessage ? <Text> There seems to be nothing here </Text> : null}
          </List>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  recipes: state.recipes || {},
});

export default connect(mapStateToProps)(DateInputs);
