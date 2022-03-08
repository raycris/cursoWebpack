/* 
El archivo de configuración nos va ayudar a poder establecer 
la configuración y elementos que vamos a utilizar

para preparar este proyecto con las configuraciones que hemos hecho en esta clase
debemos de ejecutar el comando siguiente npx webpack --mode production --config webpack.config.js
El flag —config indica donde estará nuestro archivo de configuración

Estas son las configuraciones que debemos de instalar para tener babel en el proyecto
npm install babel-loader @babel/core @babel/present-env @babel/plugin-transform-runtime. 
Empieza con la configuracion de 'module'

Para empaquetados de HTML utilizamos iniciamos en (plugins):
- npm i html-webpack-plugin -D

para empaquetar CSS y preprocesadores:
debemos de eliminar el link de referencia del archivo css en nuestr html,
luego debemos irnos a la carpeta src y en archivo index.js debemos de 
importar el archivo css ejemplo: import './styles/main.css'. En este archivo 
de configuracion anadir  una constante cibn la dependecia que instalamos
llamada MiniCssExtractPlugin

- npm i mini-css-extract-plugin css-loader -D

Optimización: hashes, compresión y minificación de archivos
- css-minimizer-webpack-plugin ⇒ Nos ayuda a comprimir nuestros archivos finales CSS
- terser-webpack-plugin ⇒ Permite minificar de una mejor forma
Instalación

npm i css-minimizer-webpack-plugin terser-webpack-plugin -D

Variables de entorno

Es importante considerar las variables de entorno va a ser un espacio 
seguro donde podemos guardar datos sensibles
Por ejemplo, subir llaves al repositorio no es buena idea cuando tienes un proyecto open source

npm install -D dotenv-webpack
Posteriormente debemos crear un archivo .env 
donde estarán la clave para acceder a la misma y el valor que contendrán

 Ejemplo
API=https://randomuser.me/api/

Es buena idea tener un archivo de ejemplo donde, 
el mismo si se pueda subir al repositorio como muestra de que campos van a ir
const Dotenv = require('dotenv-webpack');
new Dotenv()
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  watch: true,
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            // limit => limite de tamaño
            limit: 10000,
            // Mimetype => tipo de dato
            mimetype: "application/font-woff",
            // name => nombre de salida
            name: "[name].[contenthash].[ext]",
            // outputPath => donde se va a guardar en la carpeta final
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv(),
  ],
};
