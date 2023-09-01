import react, {useEffect, useState} from "react"
import React from "react";
import {useParams} from "react-router-dom";


export const CommentsReports = ({user}) => {

    const [reportData, setReportData] = useState(null)

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

    return (
        <>
            {reportData && reportData.map(report => (

                <div key={report._id}>
                    <p>{report._id}</p>
                    <p>{report.author.username}</p>
                    <p>{report.reason}</p>
                    <button onClick={() => deleteReportUser(report._id, user.user._id)}>send</button>
                </div>

            ))}

            <p>test</p>



        </>
    );
}