import { handleSubmit } from "@/hooks/submit";
import { Post } from "@/types/video";
import { Dispatch, SetStateAction } from "react";

export default function SearchBar(
    { currentVideo, setCurrentVideo, videosSearch, setPosts }:
        { currentVideo: number, setCurrentVideo: Dispatch<SetStateAction<number>>, videosSearch: number, setPosts: Dispatch<SetStateAction<Post[]>> }) {
    return (
        <div className='w-full place-content-center justify-center items-center'>
            <form className='place-content-center justify-center items-center flex mx-4' onSubmit={(e) => { handleSubmit(e, setPosts, setCurrentVideo) }}>
                {currentVideo !== videosSearch && currentVideo !== 0 && <button onClick={(e) => { e.preventDefault(); setCurrentVideo(currentVideo - 1) }} className='cursor-pointer bg-red-400 mr-2 px-4 py-3 rounded-lg'>&lt;</button>}
                <div className="flex relative w-5/6 sm:w-1/4">
                    <input name='search' type="text" id="default-search" className="focus:outline-none block w-full h-full py-4 px-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Your Video..." required />
                    <button type="submit" className="absolute right-4 top-4 focus:outline-none">
                        <svg aria-hidden="true" className="w-full h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
                {currentVideo !== videosSearch && currentVideo !== videosSearch - 2 && <button onClick={(e) => { e.preventDefault(); setCurrentVideo(currentVideo + 1) }} className='cursor-pointer bg-green-400 ml-2 px-4 py-3 rounded-lg'>&gt;</button>}
            </form>
        </div>
    )
}