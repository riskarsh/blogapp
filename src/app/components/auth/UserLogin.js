import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import img from "../../assets/download.png"
import "./UserLogin.css"
import { useDispatch, useSelector } from "react-redux";
import { clearState, signUpUser } from "../../features/auth/authSlice";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {Link} from "react-router-dom";

//Component for user login
const Login =() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state) => state.user)

    const defaultValue ={
        userEmail: "",
        userPassword:"",
    }

    //Validation Schema using yup
    const validationSchema = yup.object().shape({
        userEmail: yup.string().required("Enter your email").email(),
        userPassword:  yup.string().required("Enter your password"),
    })

    //Handle form submission
    const handleSubmit = (values) => {
        console.log("values: ", values)
    }

    return(
        <>
        <ToastContainer />
        <Formik 
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <div className="signin-main">
        <div className="signin-left">
            <h1> WELCOME </h1>
            <p>Enter your details to sign in</p>
            <img src={img} alt="" />
        </div>
        <div className="signin-right">
          <div className="signin-heading">
              <h2> Login</h2>
          </div>
          <div className="form-area">
          <Form>
          <div className="col-md-10 mt-4">
            <Field
              type="text"
              name="userEmail"
              placeholder="Email"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="userEmail" />
            </p>
            <Field
              type="text"
              name="userPassword"
              placeholder="Password"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="userPassword" />
            </p>
          </div>
          <br></br>
          <p><Link to="/resetpasswordemail">Forgot Password?</Link></p>
          <button type="submit" className="signinbutton">
            Login
          </button>
        </Form>          
          </div>
          <div className="signin-last">
              <p>
                Don't have an account?</p>
                <p>
                <Link to={"/"}> Register Now </Link>{" "}
              </p>
            </div>
        </div>
        </div>

        </Formik>

        </>
    )
}
export default Login