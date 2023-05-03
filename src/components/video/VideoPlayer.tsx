import ReactPlayer from "react-player";
import styles from '@/styles/Video.module.css'
import { Post } from "@/types/video";

export default function VideoPlayer({ posts, currentVideo }: { posts: any, currentVideo: number }) {
    return (
        <>
            {posts && posts.map((post: Post, index: number) => (
                currentVideo === index && (
                    <div key={post.id.videoId} className='flex justify-center mt-8'>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${post.id.videoId}`}
                            width="100%" height="100%"
                            controls={false}
                            className={`${styles.react_player} ${styles.player_wrapper}}`}
                        />
                    </div>
                )
            ))}
        </>
    )
}