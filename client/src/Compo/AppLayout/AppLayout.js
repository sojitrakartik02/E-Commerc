import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';


import { Helmet } from 'react-helmet';



const AppLayout = ({ children, title, description, keywords = '', author }) => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '68vh' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

AppLayout.defaultProps = {
  title: 'Ecommerce app',
  description: 'Full Stack project',
  keywords: 'ReactJs NodeJs',
  author: 'Kartik',
};

AppLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AppLayout;
