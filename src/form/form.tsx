import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { FormData } from "./type";

import "./form.css";

import { validation } from "./validation";

const SampleForm: FC = () => {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const values = watch();

  useEffect(() => {
    const validationErrors = validation(values);

    clearErrors();

    Object.entries(validationErrors).forEach(([key, message]) => {
      setError(key as keyof FormData, { type: "manual", message });
    });
  }, [values, clearErrors, setError]);

  return (
    <form style={{ maxWidth: 480 }}>
      <h2>Simple Form</h2>

      <div className="form-group">
        <label>Username</label>
        <input {...register("userName")} />
        {errors.userName && (
          <span className="error">{errors.userName.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Age</label>
        <input {...register("age")} />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SampleForm;
