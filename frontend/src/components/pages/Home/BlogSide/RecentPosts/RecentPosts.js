import "./RecentPosts.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const RecentPosts = props => {

    const [threadTitle, setThreadTitle] = useState([])

    useEffect(() => {
        const fetchDataFromBack = async () => {
            fetch('http://localhost:5000/api/homepage')
                .then(response => response.json())
                .then(data => {
                    setThreadTitle(data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fetchDataFromBack()
    }, []);

    return(
        // <div className="recent-posts">
        //     <h3><i className="fa-solid fa-signal"></i> Recent Posts</h3>
        //     {threadTitle.slice(0, 5).map(thread => (
        //         <Link key={thread._id} to={`/article-view/${thread._id}`} className="posts">{thread.title}</Link>
        //         ))}
        // </div>
        <>
                <div className="posts-main">
                    <div className="title-h3"><h3>Newest threads</h3></div>
                    {threadTitle.slice(0, 5).map(thread => (
                    <div key={thread._id} className="newest-posts">
                        <div className="container">
                            <div className="img">
                                <img src="./0f8b2870896edcde8f6149fe2733faaf.jpg" alt=""/>
                            </div>
                            <div className="news">
                                <h4 className="title">{thread.title}</h4>
                                <p className="content">{thread.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
        </>
    );
}