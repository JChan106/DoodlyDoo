import React from 'react';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { Container, Icon, Button, View, Text, Modal, Card, CardItem, List, Content, ListItem, Body, Separator} from 'native-base';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import Spacer from './Spacer';
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
      availableTimesArray: null,
    };
    this.modifyData = this.modifyData.bind(this);
    this.calculateTimes = this.calculateTimes.bind(this);
  }

  componentWillMount = () => {
    this.modifyData();
  }

  componentDidMount = () => {
    this.calculateTimes();
  }

  calculateTimes = () => {
    let tempTimes = this.state.modifiedInfo;
    if (tempTimes && tempTimes.length > 0) {
      let availableTimesArray = new Array();
      tempTimes = tempTimes.filter(x => x != null);
      tempTimes.map((baseArray) => {
        if (Array.isArray(baseArray)) {
          baseArray.map((base) => {
            let baseStart = moment(base.start,'h:mma');
            let baseEnd = moment(base.end,'h:mma');
            let tempStart = baseStart;
            let tempEnd = baseEnd;
            let didChange = tempTimes.length > 1 ? false : true;
            tempTimes.map((compareArray) => {
              if (Array.isArray(compareArray) && !isEqual(baseArray, compareArray)) {
                compareArray.map((compare) => {
                  let compareStart = moment(compare.start,'h:mma')
                  let compareEnd = moment(compare.end,'h:mma')
                  // check if base gets overlaped by or intersects compared time
                  let doesIntersect = tempStart.isBetween(compareStart, compareEnd) || tempEnd.isBetween(compareStart, compareEnd);
                  // check if times touch each other, but dont overlap
                  let doesTouch = tempStart.isSame(compareStart) || tempEnd.isSame(compareEnd);
                  // check if overlaps compared time
                  let doesGetOverlapped = compareStart.isBetween(tempStart, tempEnd) || compareEnd.isBetween(tempStart, tempEnd);

                  if (doesIntersect || doesTouch || doesGetOverlapped) {
                    didChange = true;
                    tempStart = tempStart.isAfter(compareStart) ? tempStart : compareStart;
                    tempEnd = tempEnd.isBefore(compareEnd) ? tempEnd : compareEnd;
                  }
                });
              }
            });
            if (didChange) {
              availableTimesArray.push({start: tempStart.format('h:mm a').toUpperCase(), end: tempEnd.format('h:mm a').toUpperCase()});
            }
          });
        }
      });
      availableTimesArray = this.uniqueArray(availableTimesArray);
      availableTimesArray = availableTimesArray.filter((time) => {
        let baseStart = moment(time.start,'h:mma');
        let baseEnd = moment(time.end,'h:mma');
        let didHitAll = true;
        tempTimes.map((compareArray) => {
          if (Array.isArray(compareArray)) {
            let didHitAny = false;
            if (didHitAll) {
              compareArray.map((compare) => {
                let compareStart = moment(compare.start,'h:mma')
                let compareEnd = moment(compare.end,'h:mma')
                // check if base gets overlaped by or intersects compared time
                let doesIntersect = baseStart.isBetween(compareStart, compareEnd) || baseEnd.isBetween(compareStart, compareEnd);
                // check if times touch each other, but dont overlap
                let doesTouch = baseStart.isSame(compareStart) || baseEnd.isSame(compareEnd);
                // check if overlaps compared time
                let doesGetOverlapped = compareStart.isBetween(baseStart, baseEnd) || compareEnd.isBetween(baseStart, baseEnd);

                if (doesIntersect || doesTouch || doesGetOverlapped) {
                  didHitAny = true;
                }
              });
            }
            if (!didHitAny) {
              didHitAll = false;
            }
          }
        });
        return didHitAll;
      })
      this.setState({availableTimesArray: availableTimesArray});
    }
  }

  uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

  modifyData = () => {
    let tempInfo = this.props.inputtedInfo;
    let modifiedInfo = new Array();
    Object.entries(tempInfo).map(([email, value]) => {
      modifiedInfo.push(value[this.props.date]);
    });
    this.setState({modifiedInfo: modifiedInfo});
  }

  printTimes = (array) => array && array.length > 0 ? array.map((value) => (
    <ListItem>
      <Body>
        <Text>{value.start} - {value.end}</Text>
      </Body>
    </ListItem>
  )) : null

  render() {
    const { recipes, member } = this.props;

    return (
        <View>
          <Content>
            <List>
              {Array.isArray(this.state.availableTimesArray) && this.state.availableTimesArray.length <= 0 ? <Text style={{paddingLeft: 12, paddingTop: 15}}> Uh oh! Users have conflicting availabilities </Text> : null}
              {this.printTimes(this.state.availableTimesArray)}
            </List>
            <Spacer size={40} />
          </Content>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  recipes: state.recipes || {},
});

export default connect(mapStateToProps)(CalculateDates);
