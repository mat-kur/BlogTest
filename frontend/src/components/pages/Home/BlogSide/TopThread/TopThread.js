import "./TopThread.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const TopThread = props => {

    const [topThread, setTopThread] = useState([])

    useEffect(() => {

        const getTopThreadsFromDB = async () => {
            await fetch('http://localhost:5000/api/homepage/topthreads')
                .then(response => response.json())
                .then(data => {
                    setTopThread(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        getTopThreadsFromDB()

    }, [])

    return (
        // <div className="recent-posts">
        //     <h3><i className="fa-regular fa-star"></i> Top popular threads:</h3>
        //     {topThread.length > 0 ? (
        //             topThread.map(thread => (
        //     <div key={thread._id} >
        //         <Link to={`/article-view/${thread._id}`} className="posts">{thread.title.length > 20 ? thread.title.slice(0, 20) + '...' : thread.title}<span> ({thread.likes} <i
        //             className="fa-regular fa-heart"></i>)</span></Link>
        //     </div>
        //             ))
        //     ) : null}
        //
        // </div>

    <div className="top-news posts-main">
        <div className="title-h3"><h3>Top news</h3></div>
        {topThread.length > 0 ? (
            topThread.map(thread => (
        <div key={thread._id} className="newest-posts">
            <div className="container-activity">
                <div className="img-user">
                    <img className="img-user" src="./0f8b2870896edcde8f6149fe2733faaf.jpg" alt=""/>
                </div>
                <div className="top-news">
                    <h4 className="title"><a href={`/article-view/${thread._id}`}>{thread.title.length > 20 ? thread.title.slice(0, 20) + '...' : thread.title}(</a><i
                        className="fa-regular fa-thumbs-up"></i> <span>{thread.likes}</span> ) </h4>
                </div>
            </div>
        </div>
            ))
                ) : null}
    </div>

        );
}