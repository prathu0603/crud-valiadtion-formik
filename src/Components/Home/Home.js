import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./home.css";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const callHome = async () => {
    try {
      const res = await fetch("https://crud-adv.herokuapp.com/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setUserData(data);

      if (!(res.status === 200)) {
        console.log("no user");
        history.push("/signin");
      }
    } catch (error) {
      console.log("Server Error");
      history.push("/signin");
    }
  };

  useEffect(() => {
    callHome();
  }, []);

  console.log(userData);

  const deleteUser = async (e) => {
    var result = window.confirm("Are You Sure To Delete The Profile");
    if (result) {
      e.preventDefault();
      const res = await fetch(
        `https://crud-adv.herokuapp.com/edit/${userData._id}`,
        {
          method: "DELETE",
        }
      );
      console.log(res.status);
      if (res.status === 200) {
        history.push("/signup");
      } else {
        window.alert("Server Error!!!");
      }
    }
  };
  return (
    <div className="homePage mt-5">
      <Card
        style={{ width: "30rem" }}
        className="shadow p-3 mb-5 bg-white rounded"
      >
        <div className="d-flex">
          <Card.Img
            variant="top"
            className="cardImage m-2"
            src="https://i.pinimg.com/originals/73/16/f5/7316f550de9ca0045e3d8d98a5bb5e44.png"
            alt="Profile Pic"
          />
          <Card.Body>
            <Card.Title>
              {userData.name} {userData.surname}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {userData.job}
            </Card.Subtitle>
          </Card.Body>
        </div>
        <hr className="m-2" />
        <Card.Body>
          <Card.Text>
            <b>Email : </b>
            {userData.email}
          </Card.Text>
          <Card.Text>
            {" "}
            <b>Contact Number : </b> {userData.contact}
          </Card.Text>
          <Card.Text>
            <b>Skills : </b>
            {userData.skill}
          </Card.Text>
        </Card.Body>

        <hr className="m-2" />
        <Card.Body className="d-flex justify-content-around">
          <Button
            variant="warning"
            onClick={() => {
              history.push(`/edit/${userData._id}`);
            }}
          >
            Edit
          </Button>

          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
