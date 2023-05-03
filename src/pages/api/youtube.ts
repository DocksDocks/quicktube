import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            type: "video",
            videoCategoryId: 10,
            safeSearch: "moderate",
            maxResults: 5,
            // order: "viewCount"
        },
    });
    const videos = response.data.items;
    const videoList = Array.from(videos);
    return res.status(201).json(videoList);
}