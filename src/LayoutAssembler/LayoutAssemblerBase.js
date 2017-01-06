import {Component, PropTypes} from 'react';
import {Set} from 'immutable';

import {
  addStylesheetLink
} from 'ACTION_CREATORS';

export class LayoutAssemblerBase extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    linksStylesheet: PropTypes.objectOf(Set).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  NS = 'application';
  headerClasses = `${this.NS}-header header`;
  footerClasses = `${this.NS}-footer footer`;
  sidebarClasses = `${this.NS}-sidebar sidebar`;
  mainClasses = `${this.NS}-main main`;

  componentWillMount() {

    this.props.dispatch(
      addStylesheetLink('test.css')
    );
  }

  get htmlAttributes() {
    let amp;
    let lang = 'en';

    return {lang, amp};
  }

  get css() {

    return this
      .props
      .linksStylesheet
      .toArray()
      .map(href => ({rel: 'stylesheet', href}))
      ;
  }
}
