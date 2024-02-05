import express from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import webpackConfig from "../webpack.config.dev.js";
import React from "react";
import { match, RouterContext } from "react-router";
import routes from "../client/routes";
import { renderToString } from "react-dom/server";
import path from "path";

const app = express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === "development") {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname, "../dist")));

const renderFullPage = (html) => {
  // Import Manifests
  const assetsManifest =
    global.webpackAssets && JSON.parse(global.webpackAssets);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${
        process.env.NODE_ENV === "production"
          ? `<link rel='stylesheet' href='${assetsManifest["/app.css"]}' />`
          : ""
      }
    </head>
    <body>
      <div id="app">${html}</div>
      ${
        process.env.NODE_ENV === "production"
          ? `<script
          src='${assetsManifest["/vendor.js"]}'>
        </script>`
          : ""
      }
      <script
        src='${
          process.env.NODE_ENV === "production"
            ? assetsManifest["/app.js"]
            : "/bundle.js"
        }'>
      </script>
    </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = "&#32;&#32;&#32;&#32;";
  const errTrace =
    process.env.NODE_ENV !== "production"
      ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(
          /\n/g,
          `<br>${softTab}`,
        )}</pre>`
      : "";
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.status(
        302,
        redirectLocation.pathname + redirectLocation.search,
      );
    }

    if (!renderProps) {
      return next();
    }

    const initialView = renderToString(<RouterContext {...renderProps} />);

    res
      .set("Content-Type", "text/html")
      .status(200)
      .end(renderFullPage(initialView));
  });
});

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
