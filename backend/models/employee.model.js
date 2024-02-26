module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define('employee',{
        empCode:{
            type: DataTypes.STRING(6),
            allowNull:false
        },
        firstName:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        lastName:{
            type: DataTypes.STRING(20),
            allowNull:false
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        tel:{
            type: DataTypes.STRING(10),
            allowNull:false
        },
        password:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        role:{
            type: DataTypes.STRING(1),
            allowNull:false
        },
        branchId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return employee
}

