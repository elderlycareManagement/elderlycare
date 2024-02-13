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

db.appointmentDate = require('./appointment.date.model')(sequelize,DataTypes)
db.appointmentRecord = require('./appointment.record.model')(sequelize,DataTypes)
db.branch = require('./branch.model')(sequelize,DataTypes)
db.employee = require('./employee.model')(sequelize,DataTypes)
db.patient = require('./patient.model')(sequelize,DataTypes)
db.treatmentRecord = require('./treatment.record.model')(sequelize,DataTypes)
db.internalPatient = require('./internal.patient.model')(sequelize,DataTypes)
db.healthEvaluation = require('./health.evaluation.model')(sequelize,DataTypes)
db.illnessHistory = require('./illness.history')(sequelize,DataTypes)
db.initialArrired = require('./initial.arrived.model')(sequelize,DataTypes)
db.vitalSign = require('./vital.sign.model')(sequelize,DataTypes)


db.patient.hasMany(db.treatmentRecord,{
    foreignKey:'patientId',
    as:'treatmentRecords'
})
db.treatmentRecord.belongsTo(db.patient,{
    foreignKey:'patientId',
    as:'patients'
})

db.patient.hasOne(db.illnessHistory,{
    foreignKey:"patientId",
    as:"illnessHistory"
})
db.illnessHistory.belongsTo(db.patient,{
    foreignKey:"patientId",
    as:'patient'
})

db.patient.hasOne(db.healthEvaluation,{
    foreignKey:"patientId",
    as:'healthEvaluation'
})
db.healthEvaluation.belongsTo(db.patient,{
    foreignKey:'patientId',
    as:'patients'
})

db.patient.hasOne(db.initialArrired,{
    foreignKey:'patientId',
    as:'initialArrired'
})
db.initialArrired.belongsTo(db.patient,{
    foreignKey:"patientId",
    as:'initialArrired'
})

db.patient.hasOne(db.vitalSign,{
    foreignKey:'patientId',
    as:"vitalSign"
})
db.vitalSign.belongsTo(db.patient,{
    foreignKey:'patientId',
    as:'vitalSign'
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