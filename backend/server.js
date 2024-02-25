const express = require('express')
const cors = require('cors')
require('dotenv').config({path: './config.env'})
require('./auth/passport');
const {swaggerUi, swaggerSpec} = require('./config/swaggerConfig')
const app = express()

const corsOptions = {
    origin:'*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELECT'
}

// const RouterUsers = require('./routers/routesUsers')
// const RouterProduct = require('./routers/routesProducts')
// const RoutesMember = require('./routers/memberRoutes')
const RoutesEmployee = require('./routes/employeeRoutes')
const RoutesPatient = require('./routes/patientRoutes')
const RoutesTreatmentRecord = require('./routes/treatmentRecordRoutes')
const RoutesAppointment = require('./routes/appointmentRoutes')
const RoutesVitalSign = require('./routes/vitalSignRoutes')
const RoutesBranch = require('./routes/branchRoutes')


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/employee',RoutesEmployee)
app.use('/api/patient',RoutesPatient)
app.use('/api/treatment',RoutesTreatmentRecord)
app.use('/api/appoint',RoutesAppointment)
app.use('/api/vitalSign',RoutesVitalSign)
app.use('/api/branch',RoutesBranch)


const PORT = process.env.PORT 



app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})
