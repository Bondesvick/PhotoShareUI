export default function RatingStars({ onRate }) {
    return (
        <div className="stars">
            {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => onRate(s)}>⭐</button>
            ))}
        </div>
    );
}
