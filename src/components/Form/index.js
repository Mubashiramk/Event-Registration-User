import "./form.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Pic from "./registration.jpeg";
import axios from "axios";
// //
import { io } from "socket.io-client";

export const Form = () => {
  const socket = io("http://localhost:5000");
  socket.emit("on", "user registered");

  const [isSubmit, setIsSubmit] = useState("false");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const [mail, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    shouldUnregister: true,
  });
  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/app/register", data)
      .then((response) => console.log(data, data.firstName));

    setIsSubmit("true");
    setFName(data.firstName);
    setLName(data.lastName);
    setEmail(data.email);
  };

  const registerOptions = {
    firstName: { required: "First Name is required" },
    lastName: { required: "Last Name is required" },
    email: { required: "Email is required" },
  };

  if (isSubmit == "false") {
    return (
      <div className="parentDiv">
        <div className="left-div">
          <h1>Registration</h1>
          <p>Please enter your details</p>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div>
              <label>First Name</label>
              <br />
              <input
                type="text"
                name="firstName"
                {...register("firstName", registerOptions.firstName)}
              />
              <div className="error">
                {errors?.firstName && errors.firstName.message}
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <input
                type="text"
                name="lastName"
                {...register("lastName", registerOptions.lastName)}
              />
              <div className="error">
                {errors?.lastName && errors.lastName.message}
              </div>
            </div>
            <div>
              <label>Email</label>
              <br />
              <input
                type="email"
                name="email"
                {...register("email", registerOptions.email)}
              />
              <br />
              <div className="error">
                {errors?.email && errors.email.message}
              </div>
            </div>
            <input type="submit" className="button" />
          </form>
        </div>
        <div className="imgDiv">
          <img src={Pic} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="parentDiv">
        <div className="left-div">
          <h1>Successfully Registered</h1>
          <p>{fName}</p>
          <p>{lName}</p>
          <p>{mail}</p>
        </div>

        <div className="imgDiv">
          <img src={Pic} />
        </div>
      </div>
    );
  }
};
