const Notify = require('../notify/notify.model')

const queryFindNotify = (userId, isAction) => {
    let query = {
        user: userId
    }

    if (isAction === 0) {
        query = {
            ...query,
            isAction: 0
        }
    }

    if (isAction === 1) {
        query = {
            ...query,
            isAction: 1
        }
    }

    return query
}

module.exports.getNotifies = async (req, res, next) => {
    const { isAction } = req.query
    const signedInUser = req.user
    try {
        const query = queryFindNotify(signedInUser._id, isAction)
        const notifies = await Notify.find(query)
        if (notifies.length === 0) {
            throw 'Can not any notify'
        }

        return res.json({
            notifies
        })
    } catch (error) {
        next(error)
    }
}