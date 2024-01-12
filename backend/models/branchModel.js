
module.exports = (sequelize,DataTypes) => {
    const branch = sequelize.define('branch',{
        name:{
            type: DataTypes.STRING(60),
            allowNull:false
        },
        address:{
            type: DataTypes.STRING(200),
            allowNull:false
        },
        tel:{
            type: DataTypes.STRING(20),
            allowNull:false
        },
        managerId:{
            type: DataTypes.INTEGER,
            allowNull:false

        }
    })
    return branch
}