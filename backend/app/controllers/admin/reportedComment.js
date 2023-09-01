const Comment = require("../../db/models/user-comment-model");
const Report = require("../../db/models/comment-report-model");
const User = require("../../db/models/user-model");


class ReportedComment {

    async sendReportedComments (req, res)  {

        try {
            const reportedComments = await Report.find({status: 1})
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
                report.status = 0
                report.save()
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log('You have no admin role')
        }

    }

}

module.exports = new ReportedComment()