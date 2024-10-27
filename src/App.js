import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./modules/login/views/LoginForm.js";
import RegisterForm from "./modules/login/views/RegisterForm.js";
import "./modules/firebase/app";
import Layout from "./views/Layout";
import { getAuth, onAuthStateChanged, getA } from "firebase/auth";
import { useState } from "react";
import DashboardIndex from "./modules/dashboard/views/DashboardIndex";

function App() {
  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setLoaded(true);
    if (user) {
      const uid = user.uid;
      setUser(user);
      setLogged(true);
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        {!logged && loaded && (
          <Routes>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={<LoginForm />}
              />
              <Route
                path="register"
                element={<RegisterForm />}
              />
            </Route>
          </Routes>
        )}
        {logged && loaded && (
          <Routes>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={<DashboardIndex user={user} />}
              />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
