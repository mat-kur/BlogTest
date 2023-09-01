const Comment = require("../../db/models/user-comment-model");
const Report = require("../../db/models/comment-report-model");
const User = require("../../db/models/user-model");


function getFullDate() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date
}

class ReportedComment {

    async sendReportedComments (req, res)  {

        try {
            const reportedComments = await Report.find({status: 1})
                .populate({
                    path: 'comment',
                    populate: [
                        {
                            path: 'author',
                            select: 'username'
                        },
                        {
                            path: 'thread',
                            select: 'title _id'
                        }
                    ]
                })
                .populate('author', 'username avatar')
            res.json(reportedComments)
        } catch (e) {
            console.log(e)
        }

}

    async deleteUserReport (req, res) {

        const { reportID, userID } = req.body
        const user = await User.findById(userID)

        if (user.isAdmin) {
            try {
                const report = await Report.findById(reportID)
                report.status = 0,
                report.rejectedBy = req.session.user._id,
                report.deleteDate = getFullDate()
                report.save()
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log('You have no admin role')
        }

    }

    async reportsHistory (req, res)  {

        try {
            const reportedComments = await Report.find({status: 0})
                .populate([
                    { path: 'author', select: 'username avatar' },
                    { path: 'rejectedBy', select: 'username avatar' }
                ]);
            res.json(reportedComments)
        } catch (e) {
            console.log(e)
        }

    }

    async approveReport (req, res) {
        console.log(req.body)
    }

}

module.exports = new ReportedComment()