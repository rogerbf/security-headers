const toCamelCase = require(`change-case`).camel

module.exports = (osmosis, url, followRedirects = true, hide = false, results = [], score) =>
  new Promise((resolve, reject) => {
    osmosis(
      `https://securityheaders.io/`,
      {
        q: url,
        ...(followRedirects ? { followRedirects: `on` } : {}),
        ...(hide ? { hide: `on` } : {})
      }
    )
    .config(`user_agent`, `https://www.npmjs.com/package/security-headers`)
    .set(`score`, `.score`)
    .data(data => { score = data.score })
    .find(`.reportSection`)
    .set(`section`, `.reportTitle`)
    .select(`.reportTable tr`)
    .set({
      key: `.tableLabel`,
      value: `.tableCell`
    })
    .data(data => results.push(data))
    .done(() => resolve(
      results.reduce((all, data) => {
        const section = toCamelCase(data.section)
        const key = (
          [ data.key ]
          .map(key =>
            key[key.length - 1] === `:`
            ? key.slice(0, key.length - 1)
            : key
          )
        )
        const value = data.value

        return {
          ...all,
          [section]: {
            ...(all.hasOwnProperty(section) ? all[section] : {}),
            [section === `securityReportSummary` ? toCamelCase(key) : key]: value
          }
        }
      }, { score })
    ))
    .error(error => reject(error))
  })
