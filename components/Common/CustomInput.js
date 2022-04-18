import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomInput({
  label,
  space = 0,
  type,
  errors,
  touched,
  guide,
  ...rest
}) {
  let isError =
    errors && errors[rest.id] && touched && touched[rest.id] ? true : false;

  return (
    <div className="ez-input-container">
      {(() => {
        switch (type) {
          case "text":
          case "password":
          case "number":
            return (
              <input
                className={
                  isError ? "ez-input border-danger" : "ez-input"
                }
                type={type}
                {...rest}
              />
            );
          case "textarea":
            return (
              <textarea
                className={
                  isError ? "ez-input border-danger" : "ez-input"
                }
                {...rest}
              />
            );
          case "date":
            return <DatePicker {...rest} />;
        }
      })()}
      {label && (
        <label
          className={"label"}
          style={isError ? { color: "#dc3545" } : {}}
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      {isError && (
        <div
          style={{ marginTop: "10px", marginLeft: "15px", fontSize: "14px" }}
          className="text-danger"
        >
          {errors[rest.id]}{" "}
        </div>
      )}
      {guide && guide}
    </div>
  );
}
