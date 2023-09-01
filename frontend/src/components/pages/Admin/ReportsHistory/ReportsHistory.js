import react, {useEffect, useState} from "react"
import React from "react";



export const ReportsHistory = props => {

    const [reportList, setReportList] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {

        const URL = 'http://localhost:5000/admin/reports-history/';
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReportList(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(reportList)


    return(
        <div>
            {reportList && reportList.map(report => (

                <div key={report._id}>
                    <p>{report._id}</p>
                    <p>{report.author.username}</p>
                    <p>{report.reason}</p>
                    <p>{report.date}</p>
                    {/*<p>{console.log(report.rejectedBy)}</p>*/}
                    <p>{report.rejectedBy?.username} {'usunięty by'}</p>
                </div>

            ))}
        </div>
    );

}