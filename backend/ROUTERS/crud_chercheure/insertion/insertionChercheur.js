const mongoose = require('mongoose')

//importing Chercheur schema from schema/Chercheur.js
const Chercheur = require('../../../schema/Chercheur')
const User = require('../../../schema/User')

//import generPassword function from tools/generpassword.js
const generPassword = require('../../tools/generPassword')

//import sendMailCherch function from tools/sendMailCherch.js
const sendMailCherch = require('../../tools/sendMailCherch')
const creatToken = require('../../tools/generToken')

const insertionChercheur = async (req, res) => {
    const { email,Equipe ,Diplome,nom , prenom, contact , Type, GradeRecherche, GradeEnsegnement, H_index } = req.body
    const nomComplet = prenom+ " " + nom
    try {
        //check if the chercheur already exist
        const chercheur = await Chercheur.findById(email)

        //if the chercheur exist throw an error
        if (chercheur) {
            throw new Error("Chercheur deja exister")
        }
        else{


        cherch = new Chercheur({
            _id: email,
            nomComplet,
            contact,
            Type,
            Equipe,
            Diplome,
            GradeRecherche,
            GradeEnsegnement,
            H_index
           
        })
        const password = await generPassword() 
        const user = new User({
            _id: email,
            password,
           
        })

        await cherch.save()
        await user.save()
        //send email to the chercheur
        const token = creatToken({_id: email})
        await sendMailCherch(email , nomComplet ,token)


        return res.status(200).json({ message: "Chercheur ajouter avec succes" })

        }
}

catch (error) {
    return res.status(500).json({ error: error.message })
}
}

module.exports = insertionChercheur