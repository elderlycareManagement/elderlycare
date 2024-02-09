module.exports = (sequelize,DataTypes) => {
    const illnessHistory = sequelize.define("illnessHistory",{
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        congenitalDisease:{
            type:DataTypes.STRING(30),
            allowNull:false
        },

        lastHospitalTreatment:{
            type:DataTypes.STRING(100),
            allowNull:false
        },

        surgeryHistory:{
            type:DataTypes.STRING(100),
            allowNull:false
        },

        illnessFamilyHistory:{
            type:DataTypes.STRING(100),
            allowNull:false
        },

        allergies:{
            type:DataTypes.STRING(100),
            allowNull:false
        }

    })
    return illnessHistory;
}