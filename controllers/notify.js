import NotificationSchema from "../models/Notification.js"

export const postNotification = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const postNotify =  new NotificationSchema({
            userId: id,
            ...req.body
        })

        await postNotify.save()

        res.status(201).json("Notification posted successfully")
    }
    catch (e) {
        next(e)
    }
}

export const getNotification = async (req, res, next) => {
    try {
        const {userId} = req.query
        const getNotify = await NotificationSchema.find({ userId}).sort({createdAt: -1})
        
        res.status(200).json(getNotify)

    }
    catch (e) {
        next(e)
    }
}
