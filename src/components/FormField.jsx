import React from "react";
import { useField } from "informed";

const formatPhoneNumber = (phoneNumber) => {
  let cleaned = phoneNumber.toString().replace(/\D/g, ""); // Remove non-digits
  if (cleaned.startsWith("91")) {
    cleaned = cleaned.slice(2); // Remove country code if included
  }
  if (cleaned.length > 10) {
    cleaned = cleaned.slice(0, 10); // Ensure max 10 digits
  }
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return `+91 ${cleaned}`; // Default formatting
};

const FormField = ({
  label,
  name,
  validateOnChange = true,
  showErrorIfError = true,
  validate,
  type = "text",
  formatter,
  ...rest
}) => {
  const { fieldState, fieldApi, ref } = useField({ name, validate, validateOnChange });

  const handleChange = (e) => {
    let value = e.target.value;
    if (formatter === "mobile") {
      value = formatPhoneNumber(value);
    }
    fieldApi.setValue(value);

    if (validateOnChange) {
      fieldApi.validate();
    }
  };

  //made the change

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={fieldState.value || ""}
        onChange={handleChange}
        onBlur={() => fieldApi.setTouched(true)}
        className={`form-control ${fieldState.error ? "input-error" : ""}`}
        {...rest}
      />
      {showErrorIfError && fieldState.error && <span className="error-text">{fieldState.error}</span>}
    </div>
  );
};

export default FormField;
