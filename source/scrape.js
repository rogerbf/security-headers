module.exports = (osmosis, url, followRedirects = true, results = []) =>
  new Promise((resolve, reject) => {
    osmosis(
      `https://securityheaders.io/`,
      {
        q: url,
        ...(followRedirects ? { followRedirects: `on` } : {})
      }
    )
    .config(`user_agent`, `https://www.npmjs.com/package/security-headers`)
    .find(`.reportSection`)
    .set(`section`, `.reportTitle`)
    .select(`.reportTable tr`)
    .set({
      key: `.tableLabel`,
      value: `.tableCell`
    })
    .data(data => results.push(data))
    .done(() => resolve(
      results.reduce((all, { section, key, value }) => ({
        ...all,
        [section]: {
          ...(all.hasOwnProperty(section) ? all[section] : {}),
          [key]: value
        }
      }), {})
    ))
    .error(error => reject(error))
  })
