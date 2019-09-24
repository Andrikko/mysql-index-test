const models = require("../models");

module.exports.syncDb = function () {
    const seeders = [
        {
            model: 'emailTemplate',
            data: [
                {id: 1, template: `some html tempate 1`},
                {id: 2, template: `some html tempate 2`},
                {id: 3, template: `some html tempate 3`}
            ]
        }
    ];

    models.sequelize.sync({alter: true})
        .then((res) => {
            seeders.forEach((seeder) => {
                seeder.data.forEach(async row => {
                    let rowExist = await models[seeder.model].findByPk(row.id);
                    if (!rowExist) models[seeder.model].create(row);
                });
            });
            return res;
        })
        .catch(err => {
            console.error(err);
        });
};

