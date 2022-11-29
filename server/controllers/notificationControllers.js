const  NotificationModel = require("../models/Notification");

module.exports = {

    getNotifications: (req, res) => {
        try {
            NotificationModel.find({userId: req.params.id})
            .then((response)=>{
                res.status(200).json(response)
            })
            .catch((error) => res.status(500).json(error))

        } catch (error) {
            res.status(500).json(error)
        }
    },

    updateNotifications: (req, res) => {
        try {
            NotificationModel.updateOne({userId: req.params.id},
                {
                    $set:{
                        isVisited:true
                    }
                })
            .then((response)=>{
                res.status(200).json(response)
            })
            .catch((error) => res.status(500).json(error))
        } catch (error) {

        }
    }
}