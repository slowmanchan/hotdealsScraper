/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("hotdeals", {
    id: "id",
    store: "text",
    title: "text",
    link: "text",
    category: "text",
    views: "text",
    posts: "text",
    author: "text",
    datePosted: {
      type: "timestamp",
      notNull: false
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("hotdeals")
};
