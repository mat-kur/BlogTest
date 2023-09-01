const express = require('express')
const router = new express.Router()
const CreateThread = require("../controllers/admin/create-thread")
const ThreadList = require("../controllers/admin/thread-list")
const EditThread = require("../controllers/admin/edit-thread")
const ArticleView = require('../controllers/articleView/articleView')
const UserComments = require('../controllers/articleView/user-comments')
const UserLikesComment = require('../controllers/articleView/user-likes-comment')
const UserLikesThread = require('../controllers/articleView/user-likes-thread')
const UserProfile = require('../controllers/user-profile/user-profile')
const Register = require('../controllers/login-register/register')
const Login = require('../controllers/login-register/login')
const ReportedComment = require('../controllers/admin/reportedComment')

const upload = require('../services/upload-user-avatar')



//https://chromotypic.com/urfrfuc8if4o

//admin routes
router.post('/admin/create-thread', CreateThread.createThread )
router.post ('/admin/delete-thread', ThreadList.deleteThread)
router.post ('/admin/edit-thread/:id', EditThread.editThread)
router.post ('/admin/edit-thread/:id', EditThread.editThread)
router.post ('/admin/reported-comments/delete/:id', ReportedComment.deleteUserReport)
router.post ('/admin/reported-comments/approve/:id', ReportedComment.approveReport)
router.get ('/admin/reported-comments/', ReportedComment.sendReportedComments)
router.get ('/admin/reports-history/', ReportedComment.reportsHistory)


//http://localhost:5000/admin/reported-comments/approve/${id}


//homepage
router.get('/api/homepage', CreateThread.getThreadFromDataBase )
router.get('/api/homepage/topthreads', CreateThread.mostRatedThread )
router.get('/api/homepage/topusers', CreateThread.mostActiveUsers )
router.get('/api/threads', CreateThread.getThreadByTag )

// register user
router.post('/register', upload.single('image'), Register.registerSystem )

// login user
router.post('/login', Login.loginSystem )
router.get('/logout', Login.logOut)
router.get('/isuserlogged', Login.isUserLogged)

//articleview
router.get('/article-view/:id', ArticleView.articleView )

//users comments
router.post('/article-view/:id', UserComments.userComments)
router.post('/article-view/user-delete-comment/:id', UserComments.userDeleteComment)
router.post('/article-view/user-reply-comment/:id', UserComments.userReplyComment)
router.post('/article-view/user-report-comment/:id', UserComments.userReport)
router.get('/article-view/get-reply/:commentID', UserComments.userGetReply)
router.post(`/article-view/user-like-comment/:id`, UserLikesComment.commentLike)
router.post(`/article-view/user-like-comment/most-liked-comment`, UserLikesComment.mostLikedUserComment )


//user profile
router.get('/user-profile/:id', UserProfile.userProfile )
router.post('/user/edit/:id', upload.single('image') ,UserProfile.editUserProfile )

//user like main thread
router.post('/article-view/like/:id', UserLikesThread.userLike )


module.exports = router