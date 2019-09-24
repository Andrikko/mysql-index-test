'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        templateId: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        },
        hour: {
            type: DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['hour']
            }
        ]
    });

    Event.associate = (models) => {
        Event.hasMany(models.emailReceiver, {foreignKey: 'eventId', as: 'events_receivers', onDelete: 'cascade'});
        Event.belongsTo(models.emailTemplate, {foreignKey: 'templateId', as: 'emailTemplate'});
    };
    return Event;
};