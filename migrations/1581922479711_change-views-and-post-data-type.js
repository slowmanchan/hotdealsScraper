/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.alterColumn('hotdeals', 'views', {type: 'int', using: 'CAST(views as int)'})
    pgm.alterColumn('hotdeals', 'posts', {type: 'int', using: 'CAST(posts as int)'})
};

exports.down = pgm => {
    pgm.alterColumn('hotdeals', 'views', {type: 'text'})
    pgm.alterColumn('hotdeals', 'posts', {type: 'text'})
};
