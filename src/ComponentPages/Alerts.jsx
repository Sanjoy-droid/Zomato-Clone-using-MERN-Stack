function Alert(props) {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="relative">
      {props.alert && (
        <div
          className={`rounded-none p-4 ${
            props.alert.type === "success" ? "bg-green-700" : "bg-red-800"
          } text-white`}
        >
          <span className="font-semibold">{capitalize(props.alert.type)}:</span>{" "}
          {props.alert.msg}
          <button
            className="absolute top-0 right-0 p-4"
            onClick={() => props.setAlert(null)}
          >
            <span className="text-lg">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
}
export default Alert;
