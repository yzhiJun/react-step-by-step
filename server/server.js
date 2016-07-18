import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import React from 'react';
import { match, RouterContext } from 'react-router';
import routes from '../client/routes';
import { renderToString } from 'react-dom/server';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

const renderFullPage = (html) => {
  return `
    <!DOCTYPE html>
    <html>
    <body>
      <div id="app">${html}</div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `;
}

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.status(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const initialView = renderToString(
      <RouterContext {...renderProps} />
    );

    res
      .set('Content-Type', 'text/html')
      .status(200)
      .end(renderFullPage(initialView));
  })
});

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000');
});
