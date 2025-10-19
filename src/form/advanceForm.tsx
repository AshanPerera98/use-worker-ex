import { type FC, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useWorker } from "@koale/useworker";
import type { FormData } from "./type";

import "./form.css";

import { validation } from "./validation";

const AdvanceForm: FC = () => {
  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<FormData>({ mode: "onChange" });

  const [validateWorker, { kill }] = useWorker(validation);
  const [isValidating, setIsValidating] = useState(false);
  const values = useWatch<FormData>({ control });

  useEffect(() => {
    if (!values) return;

    let isCancelled = false;

    const runValidation = async () => {
      if (!values) return;
      if (
        values.userName === undefined &&
        values.email === undefined &&
        values.age === undefined
      )
        return;

      setIsValidating(true);
      try {
        const result = await validateWorker(values);

        if (isCancelled) return;

        clearErrors();

        Object.entries(result).forEach(([key, message]) => {
          setError(key as keyof FormData, { type: "manual", message });
        });
      } catch (err) {
        console.error("Worker validation failed:", err);
      } finally {
        if (!isCancelled) setIsValidating(false);
      }
    };

    const timeout = setTimeout(runValidation, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [values, clearErrors, setError, validateWorker]);

  useEffect(() => {
    return () => {
      kill();
    };
  }, [kill]);

  const isErrors = Object.keys(errors).length > 0;

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
        <input {...register("age")} type="number" />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <button type="submit" disabled={isValidating || isErrors}>
        {isValidating && <div className="loader" />}
        <span>Submit</span>
      </button>
    </form>
  );
};

export default AdvanceForm;
