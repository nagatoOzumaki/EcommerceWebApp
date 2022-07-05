import { CssBaseline } from '@mui/material';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }
  render() {
    return (
      <Html>
        <CssBaseline />
        <Head />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// MyDocument.getInitialProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) =>
//         function EnhanceApp(props) {
//           return <App {...props} />;
//         },
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//   };
// };

export default MyDocument;
