function InputField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}) {
  // if I change type of input field do it this
  const registerOption = type === "number" ? { valueAsNumber: true } : {};

  // for style
  const InputStyle =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 ";

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium">{label}</label>
      {type === "checkbox" ? (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            id={name}
            type="checkbox"
            {...register(name)}
            className="checkbox checkbox-success"
          />

          <span>{label}</span>
        </label>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, registerOption)}
          className={`${InputStyle}`}
        />
      )}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
