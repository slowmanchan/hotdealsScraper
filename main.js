const scraper = require('./scraper/scraper.js')
const { Pool } = require('pg')

const pool = new Pool()

function main() {  
  scraper(pool)  
}

main()