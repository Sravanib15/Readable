import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categoryActions'
import { withRouter, Link } from 'react-router-dom'
import '../index.css'

class HomePage extends Component {

  componentWillMount() {
    this.setState(() => ({ fetching: true }))
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { categories, fetching } = this.props
    return (
      <div>
        <h1> Categories </h1>
        {
          !fetching && categories && categories.length > 0 && categories.map(category => (
            <ul key={category.name}>
              <Link to={`/${category.name}/posts`}>
                <h3> {category.name.charAt(0).toUpperCase() + category.name.slice(1)} </h3>
              </Link>
            </ul>
            )
          )
        }
      </div>
    )
  }
}

function mapStateToProps ({ categoryReducer }) {
  const { categories } = categoryReducer;
  return {
    categories,
    "fetching": false
  }
}

export default withRouter(connect(
  mapStateToProps
)(HomePage))
