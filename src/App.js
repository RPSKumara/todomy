import './App.css';
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";

const GetStart = lazy(() => import("./pages/GetStart"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const UserCredential = lazy(() => import("./pages/UserCredential"));

function App() {
  // const [user] = useAuthState(auth);
  const user = false;
  const location = useLocation();
  return (
    <AnimatePresence>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={user ? <GetStart /> : <UserCredential />}
          >
            <Route index element={<HomePage />}></Route>
            <Route path="about-us" element={<AboutUsPage />}></Route>
            <Route path="contact" element={<ContactPage />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
