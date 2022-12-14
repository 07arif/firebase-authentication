import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../../Hook/firebaseConfig";
import "./Login.css";
import Swal from "sweetalert2";
import ResetPassword from "../ResetPassword/ResetPassword";
import useFirebase from "../../Hook/useFirebase";
import { FacebookAuthProvider } from "firebase/auth";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const auth = getAuth(app);
  const facebookprovider = new FacebookAuthProvider()

  const handleFacebookLogin = ()=>{
    signInWithPopup(auth,facebookprovider)
    .then(result=>{
      const user = result.user;
      console.log(user)
      setUser(user)
    })
  .catch((error)=>{
    const ErrorMessage = error.message
    console.error(ErrorMessage)
  })    
  }
  const { handleGoogleLogin, test2 } = useFirebase();




  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userInfo = userCredential.user;
        setUser(userInfo);
        // console.log(usernf);
        Swal.fire("Welcome back!", "Your account Successfully Login !", "success");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        setError(errorMessage);
      });
  };

  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/0hLvWvP/undraw-Login-re-4vu2.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">

          <div className="input-box">
            <input
              onBlur={handleEmail}
              className="form-control p-3 m-2"
              type="email"
              placeholder="Email"
            />
            <input
              onBlur={handlePassword}
              className="form-control p-3 m-2"
              type="password"
              placeholder="password"
            />
            <p className="link ">
              <p className="text-danger">{error}</p>
              <Link to="/registration" className="text-decoration-none">
                <small className="text-danger link">
                  are you new? please register
                </small>
              </Link>
              <span
                onClick={() => setModalShow(true)}
                role="button"
                className="ms-4 text-primary cursor-pointer"
              >
                Forget Password?
              </span>
            </p>
            <input className="p-2" type="checkbox" />{" "}
            <span className="mb-3 ">remember me </span>
            <br />
            <button
              onClick={handleLogin}
              className="btn btn-info p-3 w-50 mt-3 fw-bold text-white"
            >
              Login
            </button>
          </div>
          <div className="d-flex">
            <button
              onClick={handleGoogleLogin}
              className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto"
            >
              <img
                className="w-25 image-fluid btn-image"
                src="https://img.icons8.com/color/344/google-logo.png"
                alt=""
              />
              <p className="fw-bold">Google SignIn</p>
            </button>
            <button
              onClick={handleFacebookLogin}
              className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto"
            >
              <img
                className="w-25 image-fluid btn-image"
                src="https://img.icons8.com/color/344/facebook-logo.png"
                alt=""
              />
              <p className="fw-bold">Facebook SignIN</p>
            </button>
          </div>
        </div>


        <ResetPassword show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default Login;
