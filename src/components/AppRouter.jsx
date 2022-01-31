import React from 'react';
import { Route, Routes, Router, Navigate } from 'react-router-dom';
import About from "../pages/About.jsx"
import Posts from '../pages/Posts.jsx';
import '../styles/App.css';
import Error from '../pages/Error.jsx';
import PostIdPage from '../pages/PostIdPage.jsx';
import { publicRoutes, privateRoutes } from '../route/index.js';
import { useContext } from 'react';
import { AuthContext } from '../contex/index.js';
import Loader from './UI/Loader/Loader.jsx';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/posts" />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>

            // <Routes>
            //     <Route path="/about"  element={<About />} />
            //     <Route exact path="/posts"  element={<Posts />} />
            //     <Route exact path="/posts/:id"  element={<PostIdPage />} />
            //     {/* <Route path="/error"  element={<Error />} /> */}
            //     <Route path="*" element={<Navigate replace to="/posts" />} />
            // </Routes>
    );
};

export default AppRouter;