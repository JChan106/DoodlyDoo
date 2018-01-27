import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const RecipeListing = ({
  error,
  loading,
  recipes,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content>
        <Spacer size={15} />
          <Button bordered
                  style={{width: '95%', alignSelf: 'center', shadowColor: '#608296'}}
                  onPress={Actions.addAppointment1}>
            <Text style={{width: '100%', textAlign: 'center'}}>Create Appointment</Text>
          </Button>
        <Spacer size={15} />
        <FlatList
          numColumns={1}
          data={recipes}
          renderItem={({ item }) => (
            <Card style={{ paddingHorizontal: 10, width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered={true}>
                <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                <Button bordered small onPress={() => onPress(item)}
                  style={{right: 0, position: 'absolute', top: 9.5}}>
                  <Text>View</Text>
                </Button>
              </CardItem>
              <CardItem cardBody bordered={true} style={{backgroundColor: 'white'}}>
                <Body style={{paddingLeft: 15}}>
                  <Spacer size={15} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

RecipeListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default RecipeListing;
