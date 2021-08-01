import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { NavLink, useHistory } from "react-router-dom";
import formImg from "../Assets/form.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object({
    name: Yup.string()
      .max(20, "Must Be 20 Characters Or Less")
      .required("Required"),
    surname: Yup.string()
      .max(15, "Must Be 15 Characters Or Less")
      .required("Required"),
    email: Yup.string().email("Enter A Valid Email").required("Required"),
    password: Yup.string()
      .min(6, "Password Must Be Atleast 6 Character Long")
      .required("Required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
    contact: Yup.string()
      .matches(phoneRegExp, "Enter A Valid Contact Number")
      .required("Required"),
    skill: Yup.string().required("Required"),
    job: Yup.string().min(3, "Enter A Valid Job Title").required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      cpassword: "",
      contact: "",
      skill: "",
      job: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const data = await fetch("https://crud-adv.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          job: values.job,
          skill: values.skill,
          contact: values.contact,
        }),
      });

      if (data.status === 409) {
        toast.dark("Email Already Registered", {
          position: "top-right",
        });
        setLoading(false);
      } else if (data.status === 200) {
        setLoading(false);
        window.alert("Registration Successful");
        history.push("/signin");
      } else {
        setLoading(false);
        window.alert("Server Error");
      }
    },
    validationSchema: validate,
  });

  return (
    <div className="container my-5">
      <div className="row">
        <h2 className="font-weight-bold text-primary mb-3 ">Signup</h2>
        <div className="col-md-5 bg-dark text-white p-3 mb-2 border border-4 border-success rounded">
          <form
            method="POST"
            onSubmit={formik.handleSubmit}
            onReset={formik.resetForm}
          >
            <label>First Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Rahul"
              className={`form-control shadow-none ${
                formik.touched.name && formik.errors.name && "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger  mb-2 ">
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""}
            </div>
            <label>Last Name</label>
            <input
              type="text"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              placeholder="Vatsal"
              className={`form-control shadow-none ${
                formik.touched.surname && formik.errors.surname && "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger  mb-2 ">
              {formik.touched.surname && formik.errors.surname
                ? formik.errors.surname
                : ""}
            </div>

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`form-control shadow-none ${
                formik.touched.email && formik.errors.email && "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger mb-2">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={`form-control shadow-none ${
                formik.touched.password &&
                formik.errors.password &&
                "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger mb-2">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              className={`form-control shadow-none ${
                formik.touched.cpassword &&
                formik.errors.cpassword &&
                "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger mb-2">
              {formik.touched.cpassword && formik.errors.cpassword
                ? formik.errors.cpassword
                : ""}
            </div>
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
              className={`form-control shadow-none ${
                formik.touched.contact && formik.errors.contact && "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger mb-2">
              {formik.touched.contact && formik.errors.contact
                ? formik.errors.contact
                : ""}
            </div>
            <label>Skills</label>
            <input
              type="text"
              name="skill"
              value={formik.values.skill}
              onChange={formik.handleChange}
              className={`form-control shadow-none ${
                formik.touched.skill && formik.errors.skill && "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger mb-2">
              {formik.touched.skill && formik.errors.skill
                ? formik.errors.skill
                : ""}
            </div>
            <label>Job Title</label>
            <input
              type="text"
              name="job"
              value={formik.values.job}
              onChange={formik.handleChange}
              className={`form-control shadow-none ${
                formik.touched.job && formik.errors.job && "is-invalid"
              }`}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger mb-2">
              {formik.touched.job && formik.errors.job ? formik.errors.job : ""}
            </div>

            <button type="submit" className="btn btn-outline-success mt-3">
              {!loading && <span>Register</span>}
              {loading && (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  wait
                </>
              )}
            </button>

            <button className="btn btn-danger mt-3 mx-5" type="reset">
              Reset
            </button>
            <span>
              Have an account ? &nbsp;
              <NavLink to="/signin">signin</NavLink>
            </span>
          </form>
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src={formImg} alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
