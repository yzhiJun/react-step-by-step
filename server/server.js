import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000');
});
