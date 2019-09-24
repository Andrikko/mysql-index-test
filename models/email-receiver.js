'use strict';
module.exports = (sequelize, DataTypes) => {
    const emailReceiver = sequelize.define('emailReceiver', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        receiver: {
            type: DataTypes.STRING
        }
    }, {});
    return emailReceiver;
};