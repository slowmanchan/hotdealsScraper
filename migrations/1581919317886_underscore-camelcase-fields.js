/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('hotdeals', 'datePosted', 'date_posted')
    pgm.renameColumn('hotdeals', 'createdAt', 'created_at')
};

exports.down = pgm => {
    pgm.renameColumn('hotdeals', 'date_posted', 'datePosted')
    pgm.renameColumn('hotdeals', 'created_at', 'createdAt')
};
