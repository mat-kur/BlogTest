import './App.css';
import {Header} from "./components/Header/Header";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {ArticleView} from "./components/pages/ArticleView/ArticleView";
import {Home} from "./components/pages/Home/Home";
import {UserProfile} from "./components/pages/UserProfile/UserProfile";
import {Dashboard} from "./components/pages/Admin/Dashboard/Dashboard";
import {CreateThread} from "./components/pages/Admin/CreateThread/CreateThread";
import {AdminNav} from "./components/pages/Admin/AdminNav/AdminNav";
import {ThreadList} from "./components/pages/Admin/ThreadList/ThreadList";
import {Register} from "./components/pages/Register/Register";
import {Login} from "./components/pages/Login/Login";
import {useEffect, useState} from "react";
import {EditThread} from "./components/pages/Admin/EditThread/EditThread";
import {EditUserProfile} from "./components/pages/EditUserProfile/EditUserProfile";
import {Footer} from "./components/Footer/Footer";
import {Auth} from "./components/PrivateRoute/PrivateRoute";
import {AuthLogInUser} from "./components/PrivateRoute/LogInRedirect";
import {CommentsReports} from "./components/pages/Admin/CommentsReports/CommentsReports";
import {ReportsHistory} from "./components/pages/Admin/ReportsHistory/ReportsHistory";
import {UsersList} from "./components/pages/Admin/UsersList/UsersList";

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Pobranie informacji o zalogowanym użytkowniku po załadowaniu komponentu
        fetch("http://localhost:5000/isUserLogged", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [user]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>} exact/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={
                    <AuthLogInUser user={user}>
                    <Login setUser={setUser}
                           user={user} />
                    </AuthLogInUser>}
                />
                <Route path="/article-view/:id" element={<ArticleView setUser={setUser} user={user} />} />
                <Route path="/user-profile/:id" element={<UserProfile setUser={setUser} user={user} />} />
                <Route path="/user/edit/:id" element={<EditUserProfile setUser={setUser} user={user} />} />
                <Route path="/admin/dashboard" element={
                    <Auth user={user}>
                        <Dashboard />
                    </Auth>} />
                <Route path="/admin/create-thread" element={
                    <Auth user={user}>
                        <CreateThread />
                    </Auth>} />
                <Route path="/admin/thread-list" element={
                    <Auth user={user}>
                        <ThreadList />
                    </Auth>} />
                <Route path="/admin/edit-thread/:id" element={
                    <Auth user={user}>
                        <EditThread />
                    </Auth>} />
                <Route path="/admin/reported-comments" element={
                    <Auth user={user}>
                        <CommentsReports user={user} />
                    </Auth>} />
                <Route path="/admin/users-list/" element={
                    <Auth user={user}>
                        <UsersList user={user}/>
                    </Auth>} />
                <Route path="/admin/reports-history/" element={
                    <Auth user={user}>
                        <ReportsHistory />
                    </Auth>} />
            </Routes>
        </div>
    )
}

export default App;