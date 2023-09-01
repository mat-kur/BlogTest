import react, {useEffect, useState} from "react"
import React from "react";
import {Link, useParams} from "react-router-dom";


export const CommentsReports = ({user}) => {

    const [reportData, setReportData] = useState(null)
    const [approveDes, setApproveDes] = useState('')
    const [activeForms, setActiveForms] = useState({})

    const { id } = useParams()


    useEffect(() => {
        const fetchReportedComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/reported-comments/`);
                if (response.ok) {
                    const data = await response.json();
                    setReportData(data);
                } else {
                    console.error('Wystąpił błąd podczas pobierania odpowiedzi');
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas komunikacji z serwerem:', error);
            }
        };

        fetchReportedComments();
    }, []);

    const deleteReportUser = async (reportID, userID) => {

        try {

            await fetch(`http://localhost:5000/admin/reported-comments/delete/${id}`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({
                    reportID,
                    userID
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(async (response) => {
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err.message);
                });

        } catch (e) {
            console.log(e)
        }




    }

    const activeFormReply = async commentID => {
        setActiveForms(prevState => ({
            ...prevState,
            [commentID]: !prevState[commentID]
        }));
    };

    const acceptUserReport = async (commentID, userCommentID, userAdminID) => {
        //  muszę na backend wysłać: id komentarza, który ma dostać reporta. id usera, który ma dostać report,

        try {
            await fetch(`http://localhost:5000/admin/reported-comments/approve/${id}`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({
                    commentID,
                    userCommentID,
                    userAdminID
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(async (response) => {
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err.message);
                });

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            //test

            <Link to={'/admin/reports-history/'}>Reports History</Link>

            {reportData && reportData.map(report => (

                <div key={report._id}>
                    <p>{report._id}</p>
                    <p>{report.comment.author.username} username ze zreportowanego kommenta</p>
                    <p>{report.comment.description} tresc komentarza</p>
                    <p>{report.comment._id}id kommenta</p>
                    <p>{report.comment.thread.title} tytuł tematu w którym jest comment</p>
                    <Link to={`/article-view/${report.comment.thread._id}`} >{report.comment.thread.title}</Link>
                    <p>{report.comment.thread._id} ID tematu w ktorym jest zreportowany comment</p>
                    <p>{report.author.username} username, który zreportował</p>
                    <p>{report.reason}</p>
                    <button onClick={() => deleteReportUser(report._id, user.user._id)}>send</button>
                    <button onClick={() => activeFormReply(report._id)}>accept report</button>
                    {activeForms[report._id] && (
                        <div>
                            <form>
                        <textarea name="reply"
                                  value={approveDes}
                                  onChange={e => setApproveDes(e.target.value)}></textarea>
                                <button onClick={() => acceptUserReport(report.comment._id, report.comment.author._id, user.user._id)}>send</button>
                            </form>
                        </div>
                    )}
                </div>


            ))}
           <br/>


        </>
    );
}