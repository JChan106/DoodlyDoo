import React from 'react';
import { Image, ScrollView } from 'react-native';
import {Body, List, ListItem, Content, Text, H1, H2, H3, Button, View, Card, CardItem, Icon } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import Spacer from './Spacer';

const About = () => (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', paddingTop: 15, paddingBottom: 15}}>
        <H3>Welcome to your Dashboard</H3>
        <Text>Your activities and notifications will be summarized here.</Text>
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
    </ScrollView>
);

export default About;
