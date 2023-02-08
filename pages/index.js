import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import ReactPlayer from 'react-player'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = event.target.search.value;
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    }

    await fetch("/api/youtube", options).then(res => {
      if (res.status == 201) return res.json();
    }).then((data) => {
      console.log(data)
      setPosts(data);
    }).catch(err => console.log(err));
  }
  return (
    <main className={`${styles.main}`}>
      <div className='w-full place-content-center justify-center items-center'>
        <form className='place-content-center justify-center items-center flex' onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input name='search' type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Your Music..." required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <div className='container flex flex-col'>
          {posts && posts.map((post) => (
            <div key={post.id.videoId} className='flex justify-center mt-4'>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${post.id.videoId}`} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
