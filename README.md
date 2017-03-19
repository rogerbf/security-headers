# security-headers

Query [securityheaders.io](https://securityheaders.io) and get the results in JSON.

All credit goes to [Scott Helme](https://scotthelme.co.uk/) who created the service. If this is useful to you then please consider donating, you can find more information about that over at [https://securityheaders.io/about/](https://securityheaders.io/about/).

## usage

```javascript
const headers = require(`security-headers`)

headers(`google.com`)
.then(result => console.log(
  `Missing headers: ${Object.keys(result['Missing Headers']).join(', ')}`
))
.catch(console.log)
```

## api

### `headers(url[, followRedirects])`

`url` - string

`followRedirects` - boolean
