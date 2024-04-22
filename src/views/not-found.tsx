import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-4xl flex flex-col items-center justify-center">
      404 - Page Not Found!
      <Link
        className="text-xl text-primary underline underline-offset-4"
        to="/"
      >
        Go to Home Page.
      </Link>
    </div>
  );
};

export default NotFound;
