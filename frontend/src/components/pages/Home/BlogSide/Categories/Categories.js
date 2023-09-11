import "./Categories.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const Categories = props => {

    const [topUsers, setTopUsers] = useState([])

    useEffect(() => {

        const getTopThreadsFromDB = async () => {
            await fetch('http://localhost:5000/api/homepage/topusers')
                .then(response => response.json())
                .then(data => {
                    setTopUsers(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        getTopThreadsFromDB()

    }, [])


    return (
        <>
            <div className="test">
                <div className="posts-main">
                    <div className="title-h3"><h3>Top users</h3></div>
                    {topUsers.length > 0 ? (
                        topUsers.map(topUser => (
                            <div className="newest-posts">
                                <div className="container-activity">
                                    <div className="img-user">
                                        <img className="img-user" src="default-avatar.jpg" alt=""/>
                                    </div>
                                    <div className="activity-user">
                                        <h4 className="title"><a
                                            href={`/user-profile/${topUser._id}`}>{topUser.username}</a></h4>
                                        <p><i className="fa-solid fa-chart-line"></i> {topUser.commentNumber}</p>
                                        <p><i className="fa-regular fa-thumbs-up"></i> 24</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>
        </>
    );
}


// <div className="recent-posts">
                //     <h3><i className="fa-solid fa-chart-line"></i> Most active users:</h3>
                //     {topUsers.length > 0 ? (
//         topUsers.map(topUser => (
//             <div key={topUser._id}>
//                 <Link to={`/user-profile/${topUser._id}`} className="posts">{topUser.username} <span>({topUser.commentNumber})</span></Link>
//             </div>
//         ))
//     ) : null}
//
// </div>