'use strict';

import path from 'path'; // Join paths with the right type of slash

let config = {
  entry: ['babel-polyfill',path.join(__dirname, 'src/app/js', 'index.js')],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // Transpile all .js files from ES6 to ES5
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "__tests__")
        ],
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/, // Use the style-loader for all .css files
        loaders: ['style', 'css']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // Use the file-loader for fonts
        loaders: ['file-loader']
      },
      {
        test: /\.jade$/, loader: 'raw!jade-html'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }

    ]
  }
};

export default config;