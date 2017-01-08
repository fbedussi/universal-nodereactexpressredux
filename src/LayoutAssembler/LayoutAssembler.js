import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {getTitle} from 'SELECTORS';

class LayoutAssembler extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
  };

  NS = 'application';

  render() {

    return (
      <div className={this.NS}>
        <Helmet
          title={this.props.title}
        />

        <header>
          <ol>
            <li>
              <Link to={'/'} >Home</Link>
            </li>
            <li>
              <Link to={'/ciao'} >Ciao</Link>
            </li>
          </ol>
        </header>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: getTitle(state)
});

export default connect(
  mapStateToProps
)(LayoutAssembler);
