const db = require("../config/db");

class Task {
  //Find all tasks for a user
  static async findByUserId(userId) {
    const query = `
        SELECT id, user_id,title,description,due_date,created_at
        FROM tasks
        WHERE user_id =$1
        ORDER BY created_at DESC
        `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  //Find task by id
  static async findById(id, userId) {
    const query = `
            SELECT id, user_id, title, description, due_date,created_at
            FROM tasks
            WHERE id=$1 AND user_id=$2
        `;
    const result = await db.query(query, [id, userId]);
    return result.rows[0];
  }

  //Create new task
  static async create(userId, title, description = null, due_date = null) {
    const query = `
            INSERT INTO tasks(user_id, title, description, due_date)
            VALUES($1,$2,$3,$4)
            RETURNING id,user_id,title,description, due_date,created_at
        `;
    const result = await db.query(query, [
      userId,
      title,
      description,
      due_date,
    ]);
    return result.rows[0];
  }

  //Delete a task
  static async delete(id, userId) {
    const query = `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;

    const result = await db.query(query, [id, userId]);
    return result.rows[0];
  }
}

module.exports = Task;
