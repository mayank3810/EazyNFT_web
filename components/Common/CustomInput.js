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
    <div class="polyone-input-container">
      {(() => {
        switch (type) {
          case "text":
          case "password":
          case "number":
            return (
              <input
                className={
                  isError ? "polyone-input border-danger" : "polyone-input"
                }
                type={type}
                {...rest}
              />
            );
          case "textarea":
            return (
              <textarea
                className={
                  isError ? "polyone-input border-danger" : "polyone-input"
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
          class={"label"}
          style={isError ? { color: "#dc3545" } : {}}
          for={rest.id}
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
