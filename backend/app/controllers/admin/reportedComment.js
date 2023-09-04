const Comment = require("../../db/models/user-comment-model");
const Report = require("../../db/models/comment-report-model");
const User = require("../../db/models/user-model");


function getFullDate() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date
}

class ReportedComment {

    constructor() {
        this.REPORT_STATUS = {
            NONE: 0,
            PENDING: 1,
            APPROVED: 2,
            REJECTED: 3
        };
        this.reportsHistory = this.reportsHistory.bind(this);
        this.approveReport = this.approveReport.bind(this);
        this.deleteUserReport = this.deleteUserReport.bind(this);
        this.sendReportedComments = this.sendReportedComments.bind(this);
    }

    sendResponse(res, status, message) {
        return res.status(status).send(message);
    }

    async sendReportedComments(req, res) {

        try {
            const reportedComments = await Report.find({status: this.REPORT_STATUS.PENDING})
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
            if (!reportedComments) this.sendResponse(res, 404, 'Document not found');

            res.json(reportedComments)
        } catch (e) {
            this.sendResponse(res, 500, 'Internal Server Error');
        }

    }

    async deleteUserReport(req, res) {

        const {reportID, userID} = req.body
        const user = await User.findById(userID)
        if (!user) this.sendResponse(res, 404, 'Document not found');

        if (user.isAdmin) {
            try {
                const report = await Report.findById(reportID)
                if (!report) this.sendResponse(res, 404, 'Document not found');

                report.status = this.REPORT_STATUS.REJECTED
                report.rejectedBy = req.session.user._id
                report.deleteDate = getFullDate()
                await report.save()
            } catch (e) {
                console.log(e)
            }
        } else {
            this.sendResponse(res, 403, 'Forbidden');
        }

    }

    async reportsHistory(req, res) {


        const { option } = req.body

        if (option === 'rejected') {
            try {
                const filteredReports = await Report.find({status: this.REPORT_STATUS.REJECTED})
                    .populate([
                        {path: 'author', select: 'username avatar'},
                        {path: 'rejectedBy', select: 'username avatar'}
                    ]);
                if (!filteredReports) this.sendResponse(res, 404, 'Document not found');
                res.json(filteredReports)

            } catch (e) {
                this.sendResponse(res, 500, 'Internal Server Error');
            }

        } else if (option === 'approved') {
            try {
                const filteredReports = await Report.find({status: this.REPORT_STATUS.APPROVED})
                    .populate([
                        {path: 'author', select: 'username avatar'},
                        {path: 'rejectedBy', select: 'username avatar'}
                    ]);
                if (!filteredReports) this.sendResponse(res, 404, 'Document not found');
                res.json(filteredReports)

            } catch (e) {
                this.sendResponse(res, 500, 'Internal Server Error');
            }
        } else {
            try {
                const reportedComments = await Report.find({ status: { $in: [this.REPORT_STATUS.APPROVED, this.REPORT_STATUS.REJECTED] } })
                    .populate([
                        {path: 'author', select: 'username avatar'},
                        {path: 'rejectedBy', select: 'username avatar'}
                    ]);
                if (!reportedComments) this.sendResponse(res, 404, 'Document not found');
                res.json(reportedComments)
            } catch (e) {
                this.sendResponse(res, 500, 'Internal Server Error');
            }
        }
    }

    async approveReport(req, res) {

        const {commentID, userCommentID, userAdminID, approveDes, reportID} = req.body

        const userAdmin = await User.findById(userAdminID)
        if (!userAdmin) {
            return this.sendResponse(res, 404, 'Admin not found');
        }

        if (userAdmin.isAdmin) {
            try {
                const report = await Report.findById(reportID)
                const user = await User.findById(userCommentID)
                const comment = await Comment.findById(commentID)

                if (!report || !user || !comment) {
                    this.sendResponse(res, 404, 'Document not found');
                }

                report.status = this.REPORT_STATUS.APPROVED
                user.warning = +1
                comment.rejectedBy = req.session.user._id
                comment.deleteDate = getFullDate()
                comment.reportContent = approveDes
                comment.reportApprover = userCommentID

                await Promise.all([report.save(), user.save(), comment.save()]);
            } catch (e) {
                console.log(e)
                this.sendResponse(res, 500, 'Internal Server Error');
            }
        } else {
            this.sendResponse(res, 403, 'Forbidden');
        }


    }

}

module.exports = new ReportedComment()