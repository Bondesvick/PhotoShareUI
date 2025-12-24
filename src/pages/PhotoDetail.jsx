import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhoto } from "../api/photosApi";
import { getComments, addComment } from "../api/commentsApi";
import { getRatingSummary, addRating } from "../api/ratingsApi";
import { useAuth } from "../auth/AuthContext";
import RatingStars from "../components/RatingStars";

export default function PhotoDetail() {
    const { id } = useParams();
    const { user } = useAuth();

    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [summary, setSummary] = useState(null);
    const [text, setText] = useState("");

    async function load() {
        setPhoto(await getPhoto(id));
        setComments(await getComments(id));
        setSummary(await getRatingSummary(id));
    }

    useEffect(() => { load(); }, [id]);

    async function submitComment(e) {
        e.preventDefault();
        await addComment(id, { text });
        setText("");
        setComments(await getComments(id));
    }

    async function rate(score) {
        await addRating(id, { score });
        setSummary(await getRatingSummary(id));
        setPhoto(await getPhoto(id));
    }

    if (!photo) return <div className="container">Loading...</div>;

    return (
        <div className="container detail">
            <img className="detail-img" src={photo.originalUrl} alt={photo.title} />
            <h2>{photo.title}</h2>
            <p>{photo.caption}</p>
            <small>{photo.location}</small>

            <div className="rating-row">
                <div>
                    Avg ⭐ {photo.averageRating?.toFixed(1) ?? "N/A"} / 5
                    {" "}({photo.totalRatings} ratings)
                </div>

                {user && (
                    <RatingStars onRate={rate} />
                )}
            </div>

            <h3>Comments</h3>
            {comments.map(c => (
                <div key={c.id} className="comment">
                    <b>{c.userDisplayName}</b>
                    <span>{new Date(c.createdAt).toLocaleString()}</span>
                    <p>{c.text}</p>
                </div>
            ))}

            {user && (
                <form onSubmit={submitComment} className="comment-form">
                    <textarea value={text} onChange={e => setText(e.target.value)} />
                    <button type="submit">Post Comment</button>
                </form>
            )}
        </div>
    );
}
