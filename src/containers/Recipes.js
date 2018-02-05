import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRecipes, getMeals, setError } from '../actions/recipes';
import { logout, getMemberData } from '../actions/member';


class RecipeListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    recipes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getRecipes: PropTypes.func.isRequired,
    getMeals: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchRecipes();

  // componentWillUpdate = () => this.fetchRecipes();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRecipes = () => {
    const uid = this.props.member.uid;
    return this.props.getRecipes(uid)
      .then(() => this.props.getMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, recipes, match, member } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        recipeId={id}
        error={recipes.error}
        loading={recipes.loading}
        recipes={recipes.recipes}
        member={member}
        reFetch={() => this.fetchRecipes()}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  member: state.member || {},
});

const mapDispatchToProps = {
  getRecipes,
  getMeals,
  setError,
  getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
