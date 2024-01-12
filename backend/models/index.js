const dbConfig = require("../config/dbconfig")

const { Sequelize,DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD ,{
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.Idle
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database')
    })
    .catch(err => {
        console.log('Error database')
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.appointmentDate = require('./appointmentDateModel')(sequelize,DataTypes)
db.appointmentRecord = require('./appointmentRecordModel')(sequelize,DataTypes)
db.branch = require('./branchModel')(sequelize,DataTypes)
db.employee = require('./employeeModel')(sequelize,DataTypes)
db.patient = require('./patientModel')(sequelize,DataTypes)
db.treatmentRecord = require('./treatmentRecordModel')(sequelize,DataTypes)
db.workHistory = require('./workHistoryModel')(sequelize,DataTypes)
db.internalPatient = require('./internalPatientModel')(sequelize,DataTypes)

// db.user = require('./userModel')(sequelize,DataTypes)
// db.product = require('./productModel')(sequelize,DataTypes)

db.branch.hasMany(db.workHistory,{
    foreignKey:'branchId',
    as:'workHistories'
})
db.workHistory.belongsTo(db.branch,{
    foreignKey:'branchId',
    as:'branches'
})

db.employee.hasMany(db.workHistory,{
    foreignKey:'empId',
    as:'workHistories'
})
db.workHistory.belongsTo(db.employee,{
    foreignKey:'empId',
    as:"employees"
})

db.patient.hasMany(db.treatmentRecord,{
    foreignKey:'patientId',
    as:'treatmentRecords'
})
db.treatmentRecord.belongsTo(db.patient,{
    foreignKey:'patientId',
    as:'patients'
})

db.patient.hasMany(db.internalPatient,{
    foreignKey:"patientId",
    as:"internalPatients"
})
db.internalPatient.belongsTo(db.patient,{
    foreignKey:'patientId',
    as:'patients'
})

db.patient.hasMany(db.appointmentRecord,{
    foreignKey:'patientId',
    as:'patients'
})
db.appointmentRecord.belongsTo(db.patient,{
    foreignKey:'patientId',
    as:'appointmentRecords'
})

db.appointmentRecord.hasMany(db.appointmentDate,{
    foreignKey:'appointmentId',
    as:'appointmentDates'
})
db.appointmentDate.belongsTo(db.appointmentRecord,{
    foreignKey:'appointmentId',
    as:'appointmentRecords'
})




db.sequelize.sync({ alter: true}).then(() => {
    console.log('yes re-sync done!!')
})

module.exports = db