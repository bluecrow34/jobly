const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


///Fix the rest of this

describe("sqlForPartialUpdate", function () {
    test("should generate correct SQL query parameters and values for a partial update", function () {
        const table = 'users';
        const items = { name: 'John', age: 30 };
        const key = 'id';
        const id = 1;

        const result = sqlForPartialUpdate(table, items, key, id);

        expect(result.query).to.equal('UPDATE users SET name=$1, age=$2 WHERE id=$3 RETURNING *');
        expect(result.values).to.eql(['John', 30, 1]);
    });
});
