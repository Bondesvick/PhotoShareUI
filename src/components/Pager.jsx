export default function Pager({ total, page, pageSize, onChange }) {
    const pages = Math.ceil(total / pageSize);
    if (pages <= 1) return null;

    return (
        <div className="pager">
            <button disabled={page<=1} onClick={() => onChange(page-1)}>Prev</button>
            <span>Page {page} / {pages}</span>
            <button disabled={page>=pages} onClick={() => onChange(page+1)}>Next</button>
        </div>
    );
}
