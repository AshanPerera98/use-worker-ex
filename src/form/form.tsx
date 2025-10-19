import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { FormData } from "./type";

import "./form.css";

const SampleForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    alert("Simple form submitted! Check console.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 480 }}>
      <h2>Simple Form</h2>

      <div className="form-group">
        <label>Username</label>
        <input
          {...register("userName", {
            required: "Username is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />
        {errors.userName && (
          <span className="error">{errors.userName.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          {...register("age", {
            required: "Age required",
            validate: (v) => (v <= 0 ? "Must be valid age" : true),
          })}
        />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SampleForm;
