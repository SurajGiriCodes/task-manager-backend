exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("tasks", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    due_date: { type: "date" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("tasks", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("tasks");
};
