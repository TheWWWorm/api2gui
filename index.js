process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const r = require('./lib/r');
const config = require('./lib/config');
const logger = require('log4js').getLogger('Index');

const app = express();
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

const { startupPort, startupHost } = config;

if (process.env.NODE_ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: 'src',
    }));
}

app.use((req, res, next) => {
    req.remoteAddress = /((?:[1-2]?[0-9]{1,2}\.?){4})/.exec(
        req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    )[0];

    logger.info(`[${req.method}] ${req.remoteAddress} Request to => ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, '/src/')));

app.get(['', '/settings'], (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.use(require('body-parser').json());

app.all('/proxy/*', (req, res) => {
    const { settings } = req.body;
    const proxyTo = `${settings.protocol}://${settings.path}:${settings.port}`;
    delete req.body.settings;

    r.post(req.path.replace(`/proxy`, proxyTo), req.body).then(({ body }) => {
        res.send(body);
    }).catch((err) => {
        res.send(err);
    });
});

const server = app.listen({
    port: startupPort,
    host: startupHost
}, () => {
    logger.info(`Starting on http://${startupHost}:${startupPort}`);
});
