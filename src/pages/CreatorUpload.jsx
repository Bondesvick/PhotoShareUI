import { useState } from "react";
import { createPhoto } from "../api/photosApi";

export default function CreatorUpload() {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [people, setPeople] = useState("");
    const [file, setFile] = useState(null);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");

    function toBase64(f) {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result);
            r.onerror = reject;
            r.readAsDataURL(f);
        });
    }

    async function submit(e) {
        e.preventDefault();
        if (!file) return;

        setBusy(true); setMsg("");
        try {
            const base64Image = await toBase64(file);
            const peoplePresent = people
                .split(",")
                .map(x => x.trim())
                .filter(Boolean);

            await createPhoto({
                title, caption, location,
                peoplePresent,
                base64Image
            });

            setMsg("Uploaded!");
            setTitle(""); setCaption(""); setLocation(""); setPeople(""); setFile(null);
        } catch (err) {
            setMsg(err.message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container">
            <h2>Creator Upload</h2>

            <form onSubmit={submit} className="upload-form">
                <input required placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
                <textarea placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} />
                <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
                <input placeholder="People present (comma separated)"
                       value={people} onChange={e=>setPeople(e.target.value)} />

                <input type="file" accept="image/*"
                       onChange={e => setFile(e.target.files?.[0])} />

                <button disabled={busy}>{busy ? "Uploading..." : "Upload"}</button>
            </form>

            {msg && <p>{msg}</p>}
        </div>
    );
}
