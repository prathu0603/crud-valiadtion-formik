import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { NavLink, useHistory } from "react-router-dom";
import formImg from "../Assets/form2.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const validate = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await fetch("https://crud-adv.herokuapp.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (res.status === 401) {
        toast.error("Invalid Credentials", {
          position: "top-right",
        });
        setLoading(false);
      } else if (res.status === 500) {
        toast.error("Server Error", {
          position: "top-right",
        });
        setLoading(false);
      } else if (res.status === 200) {
        setLoading(false);
        history.push("/home");
      }
    },
    validationSchema: validate,
  });

  return (
    <div className="container my-5">
      <div className="row">
        <h2 className="font-weight-bold text-primary mb-3 ">Signin</h2>
        <div className="col-md-5 bg-dark text-white p-3 mb-2 border border-4 border-success rounded">
          <form
            method="POST"
            onSubmit={formik.handleSubmit}
            onReset={formik.resetForm}
          >
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

            <button type="submit" className="btn btn-outline-success mt-3">
              {!loading && <span>Signin</span>}
              {loading && (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Wait
                </>
              )}
            </button>

            <button className="btn btn-danger mt-3 mx-5" type="reset">
              Reset
            </button>
            <div className="mt-5 h4">
              Don't Have an account ? &nbsp;
              <NavLink to="/signup">signup</NavLink>
            </div>
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

export default Signin;
