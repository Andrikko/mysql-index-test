'use strict';
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        name: {
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING
        },
        salary: {
            type: DataTypes.INTEGER
        },
    }, {});
    Employee.associate = function (models) {
        Employee.belongsTo(models.Company, {foreignKey: 'companyId'});
        // associations can be defined here
    };
    return Employee;
};