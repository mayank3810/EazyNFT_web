import Navbar from "../components/Layout/Navbar";
import PageBanner from '../components/Common/PageBanner';
import AuthorArea from '../components/Authors/AuthorArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import React from 'react'

class Authors extends React.Component {
  static async getInitialProps(ctx) {
    const authors = await fetch( process.env.NEXT_PUBLIC_API_URL + '/user/topAuthors');
    const topAuthors = await authors.json();
    console.log(topAuthors);
    return { topAuthors: topAuthors?.data }
  }

  render() {
    return (
      <>
        <Navbar />

        <AuthorArea topSellers={this.props.topAuthors} />
        
        <Footer />
        <Copyright />
      </>
    );
  }
};

export default Authors;
