/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumn("hotdeals", {
    updated_at: {
      type: "timestamp"
    }
  });
};

exports.down = pgm => {
  pgm.dropColumn("hotdeals", { 
    updated_at: { 
      type: "timestamp" 
    } 
  });
};
