'use strict';
module.exports = (sequelize, DataTypes) => {
    const emailTemplate = sequelize.define('emailTemplate', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        template: {
            type: DataTypes.STRING
        }
    }, {});

    return emailTemplate;
};