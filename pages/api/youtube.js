import axios from "axios";


export default async function handler(req, res) {
    const KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const query = req.body;
    const api = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: {
            part: "snippet",
            maxResults: 5,
            key: KEY,
        },
    });
    const response = await api.get("/search", {
        params: {
            q: query,
        },
    });
    const videos = response.data.items;
    const videoList = Array.from(videos).filter((i) => (i.id.videoId)).reverse().map((post) => {
        return post ? post : null;
    })
    return res.status(201).json(videoList);
}