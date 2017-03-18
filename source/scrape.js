module.exports = (osmosis, url, followRedirects = true, results = []) =>
  new Promise((resolve, reject) => {
    osmosis(
      `https://securityheaders.io/`,
      Object.assign(
        {},
        { q: url },
        followRedirects ? { followRedirects: `on` } : {}
      )
    )
    // .config(`user_agent`, `kind scraper`)
    .find(`.reportTable tr`)
    .set({
      key: `.tableLabel`,
      value: `.tableCell`
    })
    .data(data => {
      results.push(data)
    })
    .done(() => resolve(
      results.reduce((all, { key, value }) => ({
        ...all,
        [key]: value
      }), {})
    ))
    // .log(console.log)
    .error(error => reject(error))
    // .debug(console.log)
  })
