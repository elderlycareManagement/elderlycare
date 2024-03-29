const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy
const db = require('../models')
const employee = db.employee

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        (jwtPayload, done) => {
            return employee
                .findOne({where:{id: jwtPayload.id}})
                .then(employee => {

                    return done(null, employee)
                })
                .catch(err => {
                    return done(err)
                })
                        
        }
    )
)