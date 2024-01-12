module.exports = (sequelize,DataTypes) => {
    const workHistory = sequelize.define('workHistory', {
        empId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        startDate : {
            type : DataTypes.DATE,
            allowNull:false
        },
        endDate : {
            type : DataTypes.DATE,
            allowNull:false,
        },
        positionId : {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        branchId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        isActive : {
                type : DataTypes.STRING(10),
                allowNull : false
        }
    })
    return workHistory
}