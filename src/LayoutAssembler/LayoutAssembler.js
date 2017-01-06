import React from 'react';
import Helmet from 'react-helmet';
import {LayoutAssemblerBase} from './LayoutAssemblerBase';

export class LayoutAssembler extends LayoutAssemblerBase {

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
          title="Test"
          titleTemplate="Test.com - %s"
          link={
            [].concat(this.css)
          }
        />

        {this.renderHeader()}
        {this.renderSidebar()}
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    );
  }
}
