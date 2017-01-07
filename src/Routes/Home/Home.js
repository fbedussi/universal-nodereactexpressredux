import React, {Component} from 'react';
import {connect} from 'react-router';

class Home extends Component {

  render() {
    return (
      <h1>HOME PAGE</h1>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps
)(Home);
