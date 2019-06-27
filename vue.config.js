module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/spa-tesinas'
    : '/',
  devServer: {
    https: true,
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'public/service-worker.js',
        // ...other Workbox options...
    }
  }
}