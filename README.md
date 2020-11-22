# web-cchv

Corporación Chilena de Video: https://www.cchv.cl

Based on [Nuxt.js](https://nuxtjs.org/)

![Web Corporación Chilena de Video](web-cchv.jpg)

## Setup

```bash
npm install
```

### Development

Serve with hot reload on `localhost:3000` with:

```
npm run dev
```

The following environment variables can be defined on a `.env` file to enable specific features:

```javascript
BASE_URL // Base url used to query the API
NUXT_DIRECTORY // Directory of the application in the server
GOOGLE_ANALYTICS_ID // Google analytics tracking id
```

### Production

Compiles and minifies for production:

```
npm run build
npm run start // Serves production bundle
```

Generate static project:

```
npm run generate
```

## References

- https://nuxtjs.org/guide
- https://composition-api.nuxtjs.org/
- https://en.rakko.tools/tools/9/
- https://metatags.io/

## Improvements

- Add i18n, organize string labels
- Remove unused isLoading from components
- Re-asses use of mocks on development
