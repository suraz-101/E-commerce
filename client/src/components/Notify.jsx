import { Alert } from "react-bootstrap";

export const Notify = ({ variant, msg }) => {
  return (
    <div>
      <Alert variant={variant}>{msg}</Alert>
    </div>
  );
};
