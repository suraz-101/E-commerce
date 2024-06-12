import { Alert } from "react-bootstrap";

export const Notify = ({ variant, msg }) => {
  return (
    <div className="py-1 text-center">
      <Alert variant={variant}>{msg}</Alert>
    </div>
  );
};
