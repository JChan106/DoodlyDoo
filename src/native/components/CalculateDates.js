import React from 'react';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { Container, Icon, Button, View, Text, Modal, Card, CardItem, List, Content, ListItem, Body, Separator} from 'native-base';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import Colors from '../../../native-base-theme/variables/commonColor';


class CalculateDates extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      modifiedInfo: null,
    };
  }

  componentWillMount = () => {
    this.modifyData(this.props.inputtedInfo);
  }

  modifyData = () => {
    let tempInfo = this.props.inputtedInfo;
    let modifiedInfo = new Array();
    Object.entries(tempInfo).map(([email, value]) => {
      modifiedInfo = modifiedInfo.concat(value[this.props.date]);
    });
    this.setState({modifiedInfo: modifiedInfo});
  }

  printInputs = (object) => object ? Object.entries(object).map(([key, value]) => (
    <View>
      {
      value[this.props.date] ?
      <ListItem itemDivider style={{paddingLeft: 20, paddingBottom: 12, paddingTop: 12}}>
          <Text style={{fontWeight: '700', fontSize: '17'}}>{value.name} ({key.replace(/[,]/g, '.')})</Text>
       </ListItem> : null
      }
       {
         Object.entries(value).map(([date, timesArray]) => {
           if (this.props.date === date) {
             return timesArray.map((times) => (
                    <ListItem key={key} rightIcon={{ style: { opacity: 0 } }} style={{paddingLeft: 20, borderBottomWidth: 0}}>
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

    // let start = moment(this.state.modifiedInfo[0].start,'h:mma').format('h:mm a');
    // let end = moment(this.state.modifiedInfo[0].end,'h:mma').format('h:mm a');

    let start = moment(this.state.modifiedInfo[0].start,'h:mma');
    let end = moment(this.state.modifiedInfo[0].end,'h:mma');

    console.log(start.isBefore(end));


    return (
        <View>
          <Text> Temp </Text>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  recipes: state.recipes || {},
});

export default connect(mapStateToProps)(CalculateDates);
