import React from 'react';
import { Image, ScrollView } from 'react-native';
import {Container, Body, List, Left, ListItem, Content, Text, H1, H2, H3, Button, View, Card, CardItem, Icon } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import Spacer from './Spacer';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

import { logout, getMemberData } from '../../actions/member';
import Swiper from 'react-native-swiper'

const About = ({member}) => (
    <Container>
      {(member && member.email) ?
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{paddingTop: 15, paddingBottom: 15, width: '95%'}}>
            <H3 style={{left: '3%', textAlign: 'left'}}>{member.firstName}s Dashboard </H3>
            <Text style={{left: '3%', textAlign: 'left'}}>Your activities and notifications will be summarized here.</Text>
          </View>
          <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15}}>
            <CardItem header bordered>
              <Icon active name="md-flag" style={{color: Colors.brandPrimary}}/>
              <Text>Lets get you updated!</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>"Play Smash. Twice Sucks"</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={{width: '95%', alignSelf: 'center'}}>
            <CardItem header bordered>
              <Icon active name="ios-bookmark" style={{color: Colors.brandPrimary}}/>
              <Text>Account Activity</Text>
            </CardItem>
            <CardItem>
              <List>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
                <ListItem rightIcon={{ style: { opacity: 0 } }}>
                  <Text>"No Items Here"</Text>
                </ListItem>
              </List>
            </CardItem>
          </Card>
          <Spacer size={40} />
        </ScrollView> :
        <Swiper showsButtons={false}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15, justifyContent: 'center'}}>
              <H3 style={{paddingTop: 15, alignSelf: 'center'}}> Welcome to DoodlyDoo </H3>
              <CardItem header>
                  <Body><Text style={{fontWeight: '600', alignSelf: 'center'}}>The Event Planning App</Text></Body>
              </CardItem>
            </Card>
          </View>

          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15}}>
              <H3 style={{paddingTop: 15, alignSelf: 'center', paddingBottom: 10}}> Easily Make Appointments </H3>
              <CardItem cardBody>
                <Image source={{uri: 'https://i.imgur.com/k3OP6Kf.gif'}} style={{height: 500, width: null, flex: 1}}/>
              </CardItem>
            </Card>
          </View>

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15}}>
                <H3 style={{paddingTop: 15, alignSelf: 'center', paddingBottom: 10}}> Input Your Availabilities </H3>
                <CardItem cardBody>
                  <Image source={{uri: 'https://i.imgur.com/oz5d0IR.gif'}} style={{height: 500, width: null, flex: 1}}/>
                </CardItem>
              </Card>
            </View>

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15}}>
                <H3 style={{paddingTop: 15, alignSelf: 'center', paddingBottom: 10}}> Collaborating is Simple </H3>
                <CardItem cardBody>
                  <Image source={{uri: 'https://i.imgur.com/mwmA1Z6.gif'}} style={{height: 500, width: null, flex: 1}}/>
                </CardItem>
              </Card>
            </View>

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <Card style={{width: '95%', justifyContent: 'center', alignSelf: 'center', paddingBottom: 15}}>
                <CardItem style={{alignSelf: 'center'}}>
                  <Button bordered style={{shadowColor: '#608296'}} onPress={Actions.signUp}>
                    <Text style={{textAlign: 'center'}}>Get Started</Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
        </Swiper>}

    </Container>
);

export default About;
