const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "meta",
    tableName: "meta",
    columns: {
        openregistrations: {
            type: "boolean",
        },
    }
})