import "./form.css";
import { useForm } from "react-hook-form";
import pic from "./registration.jpeg";

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const registerOptions = {
    firstName: { required: "First Name is required" },
    lastName: { required: "Last Name is required" },
    email: { required: "Email is required" },
  };

  console.log(watch("example"));

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
            <div className="error">{errors?.email && errors.email.message}</div>
          </div>
          <input type="submit" className="button" />
        </form>
      </div>
      <div className="imgDiv">
        <img src={pic} />
      </div>
    </div>
  );
};
