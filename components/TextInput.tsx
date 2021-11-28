import { InputText } from "primereact/inputtext";
import React from "react";
import { FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";

export interface TextInputProps {
  id: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  label: string;
  type?: string;
  isError?: boolean;
  validationPattern?: ValidationRule<RegExp>;
  validationMessage?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  required,
  register,
  isError,
  type,
  validationPattern,
  validationMessage,
  label,
}) => (
  <div className="p-field">
    <label htmlFor={id}>{label}</label>
    <InputText
      type={type}
      id={id}
      {...register(id, {
        required: required,
        pattern: validationPattern,
      })}
    />
    {required && isError && (
      <small id={`${id}-help`} className="p-error p-d-block">
        {validationMessage}
      </small>
    )}
  </div>
);
