import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const doForm = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.reload()
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="card col-4 mx-auto my-5">
      <div className="card-header">
        <h5>Log in into app</h5>
      </div>
      <div className="card-body">
        <form onSubmit={doForm}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              type="password"
              className="form-control"
              required
            />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary">Login</button>
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
