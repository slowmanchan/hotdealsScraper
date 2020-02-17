const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({
  openDevTools: {
    mode: 'detach'
  },
  show: false
});

const url = 'http://forums.redflagdeals.com/hot-deals-f9/';

function scrape(pool) {
  nightmare
    .goto(url)
    .wait('#site_content')
    .evaluate(() => document.querySelector('#site_content').innerHTML)
    .end()
    .then(response => {
      parse(response, pool);
      console.log('completed')
    })
    .catch(err => {
      console.log(err);
    });
}

function parse(html, pool) {
  const $ = cheerio.load(html);
  $('ul.topiclist.topics.with_categories .row.topic').each((i, elem) => {
    let model = {
      threadID: parseInt($(elem)
        .attr('data-thread-id')),
      store: $(elem)
        .find('a.topictitle_retailer')
        .text()
        .trim(),
      title: $(elem)
        .find('a.topic_title_link')
        .text()
        .trim(),
      link:
        'forums.redflagdeals.com' +
        $(elem)
          .find('a.topic_title_link')
          .attr('href'),
      category: $(elem)
        .find('li.thread_category')
        .text()
        .trim(),
      datePosted: $(elem)
        .find('span.first-post-time')
        .text()
        .trim()
        .replace('th', ''),
      views: parseInt($(elem)
        .find('div.views')
        .text()
        .trim()
        .replace(',', '')),
      posts: parseInt($(elem)
        .find('div.posts')
        .text()
        .trim()
        .replace(',', '')),
      author: $(elem)
        .find('span.thread_meta_author')
        .text()
        .trim()
    };

    let queryValues = [
      model.threadID,   
      model.store, 
      model.title, 
      model.link, 
      model.category, 
      model.views, 
      model.posts, 
      model.author, 
      model.datePosted
    ];
    let queryStr = 'INSERT INTO hotdeals(thread_id, store, title, link, category, views, posts, author, date_posted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    pool
      .query(queryStr, queryValues)   
      .then(res => {
        console.log(res.rows[0])
      })
      .catch(e => console.error(e.stack))
  });
}

module.exports = scrape