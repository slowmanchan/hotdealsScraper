/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createFunction(
        'update_timestamp',
        [],
        {
            language: "plpgsql",
            replace: true,
            returns: 'TRIGGER'
        },
        `
        BEGIN 
          NEW.updated_at = now(); 
          RETURN NEW; 
        END;
        `
    )
};

exports.down = pgm => {
  pgm.dropFunction('update_timestamp')
};
