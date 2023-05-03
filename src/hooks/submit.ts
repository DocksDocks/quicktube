import { Post } from "@/types/video";
import { Dispatch, SetStateAction } from "react";

export const handleSubmit = async (event: React.SyntheticEvent, setPosts: Dispatch<SetStateAction<Post[]>>, setCurrentVideo: Dispatch<SetStateAction<number>>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        search: { value: string };
    };
    const search = target.search.value;
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(search)
    }
    await fetch("/api/youtube", options).then(res => {
        if (res.status == 201) return res.json();
    }).then((data) => {
        setPosts(data);
        setCurrentVideo(0);
    }).catch(err => console.log(err));
}