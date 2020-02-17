/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('hotdeals', { thread_id: { type: 'integer' } })
};

exports.down = pgm => {
    pgm.dropColumn('hotdeals', 'thread_id')
};
