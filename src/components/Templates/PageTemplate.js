import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

export const PageTemplate = props => {
  const {header, sidebar, content} = props;

  return (
    <React.Fragment>
      <Helmet
        title="test"
        titleTemplate="MySite.com - %s"
        defaultTitle="Dashboard"
      />
      <div className="wrapper">
        <main className="main">
          {sidebar && <aside className="main__sidebar">{sidebar}</aside>}
          <div className="main__container">
            {header &&
              <header className="main__container__header">{header}</header>}
            <div className="main__container__content">{content}</div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

PageTemplate.propTypes = {
  header: PropTypes.element,
  sidebar: PropTypes.element,
  content: PropTypes.element.isRequired
};
