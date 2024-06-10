import { Alert } from "react-bootstrap";

export const Notify = ({ variant, msg }) => {
  return (
    <div className="border border-gray-300 bg-sky-400 text-white">
      <Alert variant={variant}>{msg}</Alert>
    </div>
  );
};
