try{
const express = require('express')
const cors = require('cors')
require('dotenv').config({path: './config.env'})

const app = express()

const corsOptions = {
    origin:'*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELECT'
}

// const RouterUsers = require('./routers/routesUsers')
// const RouterProduct = require('./routers/routesProducts')
// const RoutesMember = require('./routers/memberRoutes')
const RoutesEmployee = require('./routers/employeeRoutes')
const RoutesPatient = require('./routers/patientRoutes')
const RoutesTreatmentRecord = require('./routers/treatmentRecordRoutes')

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// app.use('/api/user',RouterUsers)
// app.use('/api/product',RouterProduct)
// app.use('/api/member',RoutesMember)
app.use('/api/employee',RoutesEmployee)
app.use('/api/patient',RoutesPatient)
app.use('/api/treatment',RoutesTreatmentRecord)


const PORT = process.env.PORT 



app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})
}catch(err){
    console.log(err)
}