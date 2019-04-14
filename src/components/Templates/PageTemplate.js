import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

export const PageTemplate = props => {
  const { header, sidebar, content, title } = props;

  return (
    <React.Fragment>
      <Helmet
        title={title}
        titleTemplate="Dashboard.com - %s"
        defaultTitle="Dashboard.com"
      />
      <div className="wrapper">
        <main className="main">
          {sidebar && <aside className="main__sidebar">{sidebar}</aside>}
          <div className="container">
            {header && (
              <header className="main__header">{header}</header>
            )}
            <div className="main__content">{content}</div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

PageTemplate.propTypes = {
  header: PropTypes.element,
  sidebar: PropTypes.element,
  content: PropTypes.element.isRequired,
  title: PropTypes.string
};
