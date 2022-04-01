import Navbar from "../components/Layout/Navbar";
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import React from 'react'

class TermsCondition extends React.Component {

  static async getInitialProps(ctx) {
    const res = await fetch('https://cloud.squidex.io/api/content/polyone/terms/');
    const json = await res.json();
    return { content: json.items[0]?.data }
  }

  render() {
    return (
      <>
        <Navbar />
    

        <div className='terms-conditions-area pt-50 pb-70'>
          <div className='container'>
            <div className='section-title text-center'>
              <h2 className='m-auto'>{this.props.content.title.iv} </h2>
            </div>
            <div className='row pt-45'>
              <div className='col-lg-12'>
                <div className='single-content' dangerouslySetInnerHTML={createMarkup(this.props.content.content.iv)}>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Copyright />
      </>
    );
  }
};

function createMarkup(markup) {
  return { __html: markup };
}

export default TermsCondition;
