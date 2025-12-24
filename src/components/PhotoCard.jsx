import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
    return (
        <Link to={`/photo/${photo.id}`} className="card">
            <img src={photo.originalUrl} alt={photo.title} />
            <div className="card-body">
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
                <small>{photo.location}</small>
                <div className="rating">
                    ⭐ {photo.averageRating?.toFixed(1) ?? "N/A"} ({photo.totalRatings})
                </div>
            </div>
        </Link>
    );
}
