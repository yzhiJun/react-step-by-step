import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

const renderFullPage = () => {
  return `
    <!DOCTYPE html>
    <html>
    <body>
      <div id="app"></div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `;
}

app.use((req, res, next) => {
  res
    .set('Content-Type', 'text/html')
    .status(200)
    .end(renderFullPage());
});

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000');
});
