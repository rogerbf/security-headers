# security-headers

Query [securityheaders.io](https://securityheaders.io).

All credit goes to [Scott Helme](https://scotthelme.co.uk/) who created the service. If this is useful to you then please consider donating, you can find more information about that over at [https://securityheaders.io/about/](https://securityheaders.io/about/).

## usage

```javascript
const headers = require(`security-headers`)

headers(`google.com`)
.then(result => console.log(
  `Missing headers: ${result.missingHeaders}`
))
.catch(console.log)
```

## api

### `headers(url[, followRedirects, hide])`

- `url` - &lt;String&gt;
- `followRedirects` - &lt;Boolean&gt;
- `hide` - &lt;Boolean&gt;
