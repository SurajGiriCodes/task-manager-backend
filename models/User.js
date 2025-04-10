const db = require("../config/db");
const bcrypt = require("bcrypt");

class User {
  // Find user by email
  static async findByEmail(email) {
    const query = `
      SELECT id, username, email, password, created_at
      FROM users
      WHERE email = $1
    `;
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  // Find user by id
  static async findById(id) {
    const query = `
      SELECT id, username, email, created_at
      FROM users
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Create new user
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users(username, email, password) 
       VALUES($1, $2, $3) 
       RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );

    return result.rows[0];
  }
}

module.exports = User;
