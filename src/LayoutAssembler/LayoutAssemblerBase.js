import {Component, PropTypes} from 'react';

export class LayoutAssemblerBase extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  NS = 'application';
  headerClasses = `${this.NS}-header header`;
  footerClasses = `${this.NS}-footer footer`;
  sidebarClasses = `${this.NS}-sidebar sidebar`;
  mainClasses = `${this.NS}-main main`;

  get htmlAttributes() {
    let amp;
    let lang = 'en';

    return {lang, amp};
  }

  get title() {
    return this.props.title;
  }
}
