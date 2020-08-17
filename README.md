# web-cchv

Website of Corporacion Chilena de Video: https://www.cchv.cl

Based on [VUE CLI](https://cli.vuejs.org)

![Web Corporacion Chilena de Video](web-cchv.jpg)

## Setup

```bash
npm install
```

### Development

To start the development server use:

```
npm run serve
```

The following environment variables can be defined on a `.env` file to enable specific features:

```javascript
VUE_APP_BASE_URL // Base url used to query the API
VUE_APP_ENABLE_MOCKS // Whether if mock API data or not. Enables access to the app without the need of a real backend.
VUE_APP_ASSETS_URL // Url to look for static assets, used for gzip comprression
VUE_APP_GOOGLE_ANALYTICS // Google analytics tracking id
```

#### With mocks

The application can be used with mocks to facilitate development, thanks to `axios-mock-adapter`:

```bash
npm run serve:mocks
```

A delay of 5 seconds is set by default. For more information look at [api/mocks](./api/mocks.ts).

### Production

Compiles and minifies for production:

```
npm run build
```

### References

- https://github.com/vuejs/composition-api
- https://vue-composition-api-rfc.netlify.app/

## TODO

- add i18n, organize string labels
- divide application in chunks
- build application with mocks
- filter activities by type on activities page
