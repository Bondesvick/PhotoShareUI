import { useEffect, useState } from "react";
import { searchPhotos } from "../api/photosApi";
import PhotoCard from "../components/PhotoCard";
import Pager from "../components/Pager";

export default function ConsumerFeed() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState({ items: [], total: 0, pageSize: 20 });

    async function load(p = page) {
        const res = await searchPhotos({ search, location, page: p, pageSize: 20 });
        setData(res);
        setPage(p);
    }

    useEffect(() => { load(1); }, []);

    return (
        <div className="container">
            <div className="searchbar">
                <input placeholder="Search title/caption"
                       value={search}
                       onChange={e => setSearch(e.target.value)} />
                <input placeholder="Location"
                       value={location}
                       onChange={e => setLocation(e.target.value)} />
                <button onClick={() => load(1)}>Search</button>
            </div>

            <div className="grid">
                {data.items.map(p => <PhotoCard key={p.id} photo={p} />)}
            </div>

            <Pager
                total={data.total}
                page={page}
                pageSize={data.pageSize}
                onChange={load}
            />
        </div>
    );
}
