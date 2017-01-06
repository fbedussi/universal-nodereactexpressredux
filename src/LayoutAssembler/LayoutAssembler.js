import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';


export class LayoutAssembler extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired
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

  renderHeader() {
    let Header;
    let classes = this.headerClasses;

    switch(this.props) {

      default:
        Header = '';
        classes += ' header-default';
    }

    return (
      <header className={classes}>
        {Header}
      </header>
    );
  }

  renderSidebar() {
    let sidebar;
    let classes = this.sidebarClasses;

    switch(this.props) {

      default:
        sidebar = '';
        classes += ' sidebar-default';
    }

    return (
      <aside className={classes}>{sidebar}</aside>
    );
  }

  renderFooter() {
    let footer;
    let classes = this.footerClasses;

    switch(this.props) {

      default:
        footer = '';
        classes += ' footer-default';
    }

    return (
      <footer className={classes}>{footer}</footer>
    );
  }

  renderMain() {
    return (
      <main className={this.mainClasses}>
        {this.props.children}
      </main>
    );
  }

  render() {

    return (
      <div className={this.NS}>
        <Helmet
          htmlAttributes={this.htmlAttributes}
          title="My Title"
          titleTemplate="MySite.com - %s" />

        {this.renderHeader()}
        {this.renderSidebar()}
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    );
  }
}
