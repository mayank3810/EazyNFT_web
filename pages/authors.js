import Navbar from "../components/Layout/Navbar";
import AuthorArea from '../components/Authors/AuthorArea';
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
        
        
        <Copyright />
      </>
    );
  }
};

export default Authors; 
