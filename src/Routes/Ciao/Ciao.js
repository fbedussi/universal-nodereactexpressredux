import React, {Component} from 'react';
import {connect} from 'react-redux';

class Ciao extends Component {

  render() {
    return (
      <h1>Ciao</h1>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps
)(Ciao);
