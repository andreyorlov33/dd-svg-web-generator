import path from 'path'
import webpack from 'webpack'

export default {
    entry: path.join(__dirname, '/client/index.jsx'),
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: path.join(__dirname, '/client/assets/')
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, './'),
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.(png|jpg|)$/,
                loader: 'url-loader?limit=200000'
            }
        ]
    }
}