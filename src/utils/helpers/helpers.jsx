import { Spinner } from "react-bootstrap";

export const baseUrl = "https://my-flix-api-267292098478.europe-north1.run.app";
export const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

export const LoadingSpinner = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="spinner-overlay position-absolute top-50 start-50 translate-middle">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </>
  );
};
