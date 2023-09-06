import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import img from "../../assets/download.png"
import "./UserSignup.css"
import { useDispatch, useSelector } from "react-redux";
import { clearState, signUpUser } from "../../features/auth/authSlice";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Initial Schema of formik
const Signup = () => {
    const [profilePic, setProfilepic] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.user)
    console.log("data ",data)

    //Display error or success message using toast
    useEffect(() => {
      if (data) {
        if (data.success) {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(clearState());
          console.log("true");
          navigate("/login");
        } else {
          toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(clearState());
          console.log("false");
        }
      }
    }, [data]);
    
    // Initial values of form
    const defaultValue ={
        userName: "",
        userEmail: "",
        userPassword: "",
        userCity: "",
        userState: "",
        userPhone: "",

    }
    //Set profile picture
    const addUserpic = (e) => {
        setProfilepic(e.target.files[0]);
    }

    //Validation Schema using yup
    const validationSchema = yup.object().shape({
        userName: yup.string().required("Enter your name"),
        userEmail: yup.string().required("Enter your email"),
        userPassword: yup.string().required("Enter your password"),
        userCity: yup.string().required("Enter your city"),
        userState: yup.string().required("Enter your state"),
        userPhone:yup.string().required("Enter your phone"),

    })
    //Handle form submission
    const handleSubmit= (values) => {
        let userObj = {...values, profilePic:profilePic}
        console.log("data", userObj)
        dispatch(signUpUser(userObj));

    }

    return(
        <>
        <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            <div className="signup-main">
              <div className="signup-left">
            <h1> WELCOME </h1>
            <p>Please Create an account to access the blog</p>
              <img src={img} alt=""/>
              </div>
              <div className="signup-right">
            <div className="signup-heading">
              <h2> Sign Up</h2>
            </div>
            <div className="form-area">
              <Form>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="userName"
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="userName" />
                  </p>
                </div>

                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="userEmail"
                    placeholder="Enter your email"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="userEmail" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="userPassword"
                    placeholder="Enter your password"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="userPassword" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="userCity"
                    placeholder="Enter your city"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="Enter your city" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="userState"
                    placeholder="Enter your State"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="userState" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="userPhone"
                    placeholder="Enter your mobile"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="userPhone" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <input
                    type="file"
                    name="profilepic"
                    className="form-control-file"
                    onChange={addUserpic}
                  />
                </div>
                <br></br>
                <button type="submit" className="signupbutton">
                  Sign Up
                </button>
              </Form>
            </div>
            <div className="signup-last">
              <p>
                I already have an account?
                <Link to={"/login"}> Login </Link>{" "}
              </p>
            </div>
              </div>
          </div>          
        </Formik>
        </>
    )
}
export default Signup;