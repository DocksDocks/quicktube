import SearchBar from '@/components/SearchBar'
import VideoPlayer from '@/components/video/VideoPlayer'
import styles from '@/styles/Video.module.css'
import { Post } from '@/types/video'
import Head from 'next/head'
import { useState } from 'react'

export default function Video() {
    const [posts, setPosts] = useState<Post[]>([]);
    const videosSearch = 6;
    const [currentVideo, setCurrentVideo] = useState(videosSearch);
    return (
        <div className={`bg-slate-700 w-screen h-screen relative`}>
            <Head>
                <title>Videos</title>
            </Head>
            <main className={`${styles.main}`}>
                <SearchBar currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} videosSearch={videosSearch} setPosts={setPosts} />
            </main>
            <div className={`${styles.video}`}>
                <VideoPlayer posts={posts} currentVideo={currentVideo} />
            </div>
        </div>
    )
}
