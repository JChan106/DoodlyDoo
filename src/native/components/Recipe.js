import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const RecipeView = ({
  error,
  recipes,
  recipeId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let recipe = null;
  if (recipeId && recipes) {
    recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
  }

  // Recipe not found
  if (!recipe) return <Error content={ErrorMessages.recipe404} />;

  // Build Ingredients listing
  const ingredients = recipe.ingredients.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  // Build Method listing
  const method = recipe.method.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <Spacer size={25} />
        <H3>Some Appointment</H3>
        <Text>Organizer: Jackie Chan</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>Description</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>"Play Smash. Twice Sucks"</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Location</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>"Kevin's place"</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Attendees</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {ingredients}
              </List>
            </Content>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text style={{color: '#a32323'}}>Can Not Attend</Text>
          </CardItem>
          <CardItem>
            <List>
              {method}
            </List>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text style={{color: '#a32323'}}>Has Not Responded</Text>
          </CardItem>
          <CardItem>
            <List>
              {method}
            </List>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text style={{color: '#49c179'}}>Available Times</Text>
          </CardItem>
          <CardItem>
            <List>
              {method}
            </List>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RecipeView.propTypes = {
  error: PropTypes.string,
  recipeId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
