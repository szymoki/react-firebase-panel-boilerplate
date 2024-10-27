import { useState } from "react";
import { Link } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [validation, setValidation] = useState({});
  const [success, setSuccess] = useState(false);

  const doForm = (e) => {
    e.preventDefault();
    const newValidation = {};

    if (rePass != pass) newValidation.rePass = "Hasła muszą się zgadzać";
    setValidation(newValidation);
    if (Object.keys(newValidation).length == 0) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          setSuccess(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setValidation({ email: error.message });
        });
    }
  };

  return (
    <div className="card col-4 mx-auto">
      <div className="card-header">
        <h5>Register</h5>
      </div>
      <div className="card-body">
        {!success && (
          <form onSubmit={doForm}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className={(validation.email ? "is-invalid" : "") + " form-control"}
                required
              />
              <div className="invalid-feedback">{validation.email}</div>
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                className={(validation.pass ? "is-invalid" : "") + " form-control"}
                required
              />
              <div className="invalid-feedback">{validation.pass}</div>
            </div>
            <div className="form-group mb-3">
              <label>Repeat password</label>
              <input
                onChange={(e) => setRePass(e.target.value)}
                value={rePass}
                type="password"
                className={(validation.rePass ? "is-invalid" : "") + " form-control"}
                required
              />
              <div className="invalid-feedback">{validation.rePass}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary">Register</button>
              <Link to="/">Have an account? Log in</Link>
            </div>
          </form>
        )}
        {success && (
          <div className="alert bg-info text-white">
            Super udało się zarejestrować <Link to="/">Zaloguj się</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
