import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container">
            <h2>Page not found</h2>
            <p>
                Go back to the <Link to="/">home page</Link>.
            </p>
        </div>
    );
}
