import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
  getTitle,
  getStylesheets
} from 'SELECTORS';

import {
  addStylesheet
} from 'ACTION_CREATORS';

class LayoutAssembler extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    stylesheets: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  NS = 'application';

  componentWillMount() {
    this.props.dispatch(addStylesheet('test.css'));
  }

  get stylesheets() {
    return this.props.stylesheets
      .map(href => ({
        rel: 'stylesheet',
        href
      }))
      ;
  }

  render() {

    return (
      <div className={this.NS}>
        <Helmet
          title={this.props.title}
          link={[].concat(this.stylesheets)}
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
  title: getTitle(state),
  stylesheets: getStylesheets(state)
});

export default connect(
  mapStateToProps
)(LayoutAssembler);
