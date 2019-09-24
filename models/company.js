'use strict';
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        name: {
            type: DataTypes.STRING
        }
    }, {});
    Company.associate = function (models) {
        Company.hasMany(models.Employee, {
            foreignKey: 'companyId',
            as: 'employee'
        });
        // associations can be defined here
    };
    return Company;
};