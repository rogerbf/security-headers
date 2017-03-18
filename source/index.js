const osmosis = require(`osmosis`)
const scrape = require(`./scrape`)

module.exports = scrape.bind(null, osmosis)
