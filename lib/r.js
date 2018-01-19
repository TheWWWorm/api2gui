const request = require('request');
const logger = require('log4js').getLogger('Request');

function tryToJSON(str) {
    try {
        return (!!str && (JSON.parse(str)));
    } catch (e) {
        return null;
    }
}

module.exports = ['get', 'post', 'put', 'del', 'delete'].reduce((r, method) => {
    r[method] = (url, body, options = {}) => {
        return new Promise((resolve, reject) => {

            body = JSON.stringify(body);
            logger.info(`[${method.toUpperCase()}] Request to backend => ${url}`);
            body && (logger.info('With BODY: ' + body));

            request[method](Object.assign({
                url,
                body,
                timeout: 10 * 1e3,
                headers: {
                    'Content-Type': 'application/json'
                },
                proxy: process.env.PROXY
            }, options), (error, response, body) => {
                try {
                    if (!response) {
                        throw new Error('No response');
                    }
                    body = tryToJSON(body);
                    error = (body && body.constructor === Object && body.error) || error;
                    error ?
                        logger.warn(`Unsuccessful response from <= ${url}: ${error.constructor === Object ?
                            ('Code:' + error.statusCode + ' - ' + error.message) :
                            ('Error: ' + error)
                        }`) :
                        logger.info(`successful response from ${url} <= : ${JSON.stringify(body, '', 2)}`);

                    resolve({
                        error,
                        response,
                        statusCode: response && response.statusCode,
                        body
                    });
                } catch (err) {
                    logger.error('Error in request: ' + err.stack);
                    reject(error);
                }
            });
        });
    };
    return r;
}, {});
