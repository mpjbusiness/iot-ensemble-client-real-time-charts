const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://fathym-cloud-prd.azure-api.net/fcp-iotensemble/',
      changeOrigin: true,
      headers: {
        'lcu-subscription-key': process.env.REACT_APP_IOT_ENSEMBLE_LCU_SUBSCRIPTION_ID
      },
      pathRewrite: {
        '^/api/': '/'
      },
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        // proxyReq.setHeader()
      },
      onProxyRes: (proxyRes, req, res) => {
        // log original request and proxied request info
        const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
        console.log(exchange); // [GET] [200] / -> http://www.example.com
      },
    })
  );
};
