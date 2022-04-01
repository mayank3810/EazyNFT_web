import Link from 'next/link';
import React from "react";

const CreateArea = ( ctx ) => {

  return (
    <>
      <div className='create-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title text-center'>
            <h2>{ctx?.cmsContent?.title?.iv}</h2>
          </div>

          <div className='row align-items-center pt-45'>
            <div className='col-lg-6'>
              <div className='create-img'>
                <img src='../images/create/create-img.png' alt='Images' />
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='create-card-right pl-20'>
                <div className='row justify-content-center'>
                  <div className='col-lg-6 col-6'>
                    <div className='create-card'>
                      <img
                        src='../images/create/create-icon1.png'
                        alt='Images'
                      />
                      <h3> <Link href='/add-wallet'>
                        <a>{ctx?.cmsContent?.heading1?.iv}</a></Link>
                      </h3>
                      <p>
                      {ctx?.cmsContent?.description1?.iv}
                      </p>
                    </div>
                  </div>

                  <div className='col-lg-6 col-6'>
                    <div className='create-card'>
                      <img
                        src='../images/create/create-icon2.png'
                        alt='Images'
                      />
                      <h3><Link href='/create'>
                        <a>
                        {ctx?.cmsContent?.heading2?.iv}
                        </a></Link>
                      </h3>
                      <p>
                      {ctx?.cmsContent?.description2?.iv}

                      </p>
                    </div>
                  </div>

                  <div className='col-lg-6 col-6'>
                    <div className='create-card'>
                      <img
                        src='../images/create/create-icon3.png'
                        alt='Images'
                      />
                      <h3><Link href='/help-center'>
                        <a> {ctx?.cmsContent?.heading3?.iv}</a></Link>
                      </h3>
                      <p>
                      {ctx?.cmsContent?.description3?.iv}

                      </p>
                    </div>
                  </div>

                  <div className='col-lg-6 col-6'>
                    <div className='create-card'>
                      <img
                        src='../images/create/create-icon4.png'
                        alt='Images'
                      />
                      <h3><Link href='/activity'>
                        <a>{ctx?.cmsContent?.heading4?.iv}</a></Link>
                      </h3>
                      <p>
                      {ctx?.cmsContent?.description4?.iv}

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default CreateArea;
