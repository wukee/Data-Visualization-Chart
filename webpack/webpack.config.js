/**
 *
 * webpack.config.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2017/3/19
 *
 * @内容 作用
 * @内容 作用
 */
//config
const config = require('../config/config');
const {Entrys}=require('./Entrys.config');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
//lib
const tsImportPluginFactory=require('ts-import-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge')
var ExtractTextPlugin =require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var baseConfig = {
    target: 'web',
    context:path.join(__dirname,'..'),
    entry:{
        app:Entrys.app,
        vendor:['react']
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js",".js",".jsx",".ts",".tsx"]
    },
    output: {
        filename: '[name].js',
        path: config.outputPath,
        publicPath: '/'
    },
    module:{
        rules:[

        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:config.title,
            template: path.resolve(
                config.projectRoot,'webpack/resource/index.html'
            ),
        })
    ]


};
const fontLoader = [['woff', 'application/font-woff'], ['woff2', 'application/font-woff2'], ['otf', 'font/opentype'], ['ttf', 'application/octet-stream'], ['eot', 'application/vnd.ms-fontobject'], ['svg', 'image/svg+xml']]
fontLoader.forEach((font) => {
    let extension = font[0]
    let mimetype = font[1]
    baseConfig.module.rules.push({
        test    : new RegExp(`\\.${extension}$`),
        loader  : 'url-loader',
        options : {
            name  : 'fonts/[name].[ext]',
            limit : 10000,
            mimetype,
        },
    })
})
//****__PROD__****//
var PROD_Config ={
    mode: 'production',
    output: {
        filename: '[name]_[hash].js',
        path: config.outputPath
    },
    module:{
        rules:[
            {
                test: /\.js[x]$/,
                type: 'javascript/auto',
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                type: 'javascript/auto',
                use:[
                    {
                        loader: 'babel-loader',
                        options:{
                            cacheDirectory:true
                        }
                    },
                    {
                        loader: "awesome-typescript-loader",
                        options:{
                            getCustomTransformers:()=>({
                                before:[tsImportPluginFactory({libraryName:"antd",style:"css"})]
                            }),
                            useBabel:true,
                            babelCore: '@babel/core',
                            useCache:true,
                            configFileName:path.resolve(__dirname,'../webpack/Webtsconfig.json')
                        }
                    }
                ],
                exclude: path.resolve(config.projectRoot, 'node_modules'),
                include: [path.resolve(config.projectRoot, "src/Client"),path.resolve(config.projectRoot, "src/models")]
            },
            {
                test: /\.s?css$/,
                exclude: [/node_modules/],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {
                            // modules: true,
                            // camelCase: true,
                            // importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(config.projectRoot,'.postcssrc.js')
                            }
                        }
                    },
                    {
                        loader:'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }]
            },
            {
                test: /\.s?css$/,
                include: [/node_modules/],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {
                            // modules: true,
                            // camelCase: true,
                            // importLoaders: 1
                        }
                    },
                    {
                        loader:'sass-loader'
                    }]
            },{
                test: /\.(png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: 'url-loader',//浏览器发布用,
                options: {
                    limit: 50000
                }
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            //判断当前是否处于开发状态
            'process.env': {NODE_ENV: '"production"'},
            DEBUG: false
        }),
        new ExtractTextPlugin({filename:'assets/styles/[name]_[hash].bundle.css', allChunks: true}),


    ]
}
//****__DEV__****//
const DEV_Config= {
    mode:'development',
    devtool: "inline-source-map",

    output: {
        filename: './dist/[name].js',
        path: config.outputPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                type: 'javascript/auto',
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for Webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                },
            },
            {
                test: /\.tsx?$/,
                type: 'javascript/auto',
                use:[
                    {
                        loader: 'babel-loader',
                        options:{
                            cacheDirectory: true,
                            plugins: ['react-hot-loader/babel'],
                        }
                    },
                    {
                        loader: "awesome-typescript-loader",
                        options:{
                            getCustomTransformers:()=>({
                                before:[tsImportPluginFactory({libraryName:"antd",style:"css"})]
                            }),
                            useCache:true,
                            configFileName:path.resolve(__dirname,'../webpack/Webtsconfig.json')
                        }
                    }
                ],
                exclude: path.resolve(config.projectRoot, 'node_modules'),
                include: [path.resolve(config.projectRoot, "src/Client"),path.resolve(config.projectRoot, "src/models")]
            },
            {
                test: /\.s?css$/,
                exclude: [/node_modules/],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {
                            // modules: true,
                            // camelCase: true,
                            // importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(config.projectRoot,'.postcssrc.js')
                            }
                        }
                    },
                    { loader: 'sass-loader', options: {

                            // outputStyle: 'expanded'
                    } }
                    ]
            },
            {
                test: /\.s?css$/,
                type: 'javascript/auto',
                include: [/node_modules/],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {
                            // modules: true,
                            // camelCase: true,
                            importLoaders: 1
                        }
                    },         { loader: 'sass-loader', options: {
                            outputStyle: 'expanded',
                           } }]
            },
            {
                test: /\.(png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: 'url-loader',//浏览器发布用,
                options: {
                    limit: 50000
                }
            }
        ]
    },
    devServer: {
        host: 'localhost',
        historyApiFallback: true,
        hot: true,
        open: true,
        contentBase:config.projectRoot
    },
    plugins:[
        new webpack.DefinePlugin({
            //判断当前是否处于开发状态
            DEBUG: true
        })]
};

const addons = (/* string | string[] */ addonsArg) => {
    let addons = [...[addonsArg]] // Normalize array of addons (flatten)
        .filter(Boolean); // If addons is undefined, filter it out
    return addons.map(addonName =>
        require(`./addons/webpack.${addonName}.js`)
    );
};

module.exports = env=>{
    if (!env) {
        throw new Error('环境变量env.env需要设置为dev 或 production');
    }
    let mergedConfig;
    if (env.env=='production'){
        mergedConfig= merge(
        baseConfig,
        PROD_Config,
        ...addons(env.addons)
    )
    }
    if (env.env=='dev'){
        mergedConfig= merge(
            baseConfig,
            DEV_Config,
            ...addons(env.addons)
        );
    }

    return mergedConfig;
};
