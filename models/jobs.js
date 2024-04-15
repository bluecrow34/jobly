const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job {

    static async create({ id, title, salary, equity, company_handle }) {
        const duplicateCheck = await db.query(
              `SELECT id
               FROM jobs`,
            [handle]);

    
        const result = await db.query(
              `INSERT INTO jobs
               (id, title, salary, equity, company_handle)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING id, title, salary, equity, company_handle`,
            [
                id,
                title, 
                salary, 
                equity,
                company_handle,
            ],
        );
        const job = result.rows[0];
    
        return job;
      }
      static async findAll() {
        const jobRes = await db.query(
              `SELECT id, title, salary, equity, company_handle
               FROM jobs`);
        return jobRes.rows;
      }
    };



      module.exports = Job;