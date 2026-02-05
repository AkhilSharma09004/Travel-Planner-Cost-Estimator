import React from 'react';
import Footer from '../../components/Home/Footer';
import Header from '../../components/Home/Header';
import SEO from '../../components/seo';
import Estimator from '../../components/Estimator/Estimator';

const EstimatorPage = () => {
  return (
    <>
      <SEO pageTitle={'Estimator'} />
      <Header />
      <Estimator />
      <Footer />
    </>
  );
};

export default EstimatorPage;
