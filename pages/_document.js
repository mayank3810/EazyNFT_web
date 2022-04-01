import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zxx">
        <Head>
          <link rel="icon" type="image/png" href="../images/favicon.png"></link>
          {/* <script id="ze-snippet"src="https://static.zdassets.com/ekr/snippet.js?key=4d942ac8-e16a-43e9-9028-851d0bd4c426"/> */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-N18VR4JE92`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N18VR4JE92', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
