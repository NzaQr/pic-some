import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    //Initialization
    setLoading(true);
    setError("");

    //we want to do all these promises and then wait till they all finish before we throw any errors
    //checks if we change the mail and pushes the new mail to the promise

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    //We pass the array of promises
    //This is going to run a .then() which is going to run whenever our promise is executed
    //As soon all the promises finish, .then will run if theyre all successful
    //If theyre all successful the user is redirected to homepage
    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div>
        <div>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <h1 variant="danger">{error}</h1>}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <label>Email</label>
              <input
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </div>
            <div id="password">
              <label>Password</label>
              <input
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep same password"
              />
            </div>
            <div id="password-confirm">
              <label>Password Confirmation</label>
              <input
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep same password"
              />
            </div>
            <button disabled={loading} className="w-100" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
