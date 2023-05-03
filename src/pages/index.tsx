import styles from '@/styles/Video.module.css'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import Head from 'next/head'

// youtube video result
interface Post {
    id: {
        videoId: string
    }
}

export default function Video() {
    const [posts, setPosts] = useState<Post[]>([]);
    const videosSearch = 6;
    const [currentVideo, setCurrentVideo] = useState(videosSearch);
    const handleSubmit = async (event: React.SyntheticEvent) => {
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
    return (
        <div className={`bg-slate-700 w-screen h-screen relative`}>
            <Head>
                <title>Movies</title>
            </Head>
            <div>
                <main className={`${styles.main}`}>
                    <div className='w-full place-content-center justify-center items-center'>
                        <form className='place-content-center justify-center items-center flex mx-4' onSubmit={handleSubmit}>
                            {currentVideo !== videosSearch && currentVideo !== 0 && <button onClick={(e) => { e.preventDefault(); setCurrentVideo(currentVideo - 1) }} className='cursor-pointer bg-red-400 mr-2 px-4 py-3 rounded-lg'>&lt;</button>}
                            <div className="flex relative w-5/6 sm:w-1/4">
                                <input name='search' type="text" id="default-search" className="focus:outline-none block w-full h-full py-4 px-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Your Movie..." required />
                                <button type="submit" className="absolute right-4 top-4 focus:outline-none">
                                    <svg aria-hidden="true" className="w-full h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </div>
                            {currentVideo !== videosSearch && currentVideo !== videosSearch - 2 && <button onClick={(e) => { e.preventDefault(); setCurrentVideo(currentVideo + 1) }} className='cursor-pointer bg-green-400 ml-2 px-4 py-3 rounded-lg'>&gt;</button>}
                        </form>
                    </div>
                </main>
                <div className={`${styles.video}`}>
                    {posts && posts.map((post, index) => (
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
                </div>
            </div>
        </div>
    )
}
