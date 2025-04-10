exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  //Add indexes for faster queries
  pgm.createIndex("users", "email");
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
