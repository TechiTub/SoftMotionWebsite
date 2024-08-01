import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

const Slug = () => {
    const [videos, setVideos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const { slug } = router.query;
        let promise = databases.listDocuments(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_VIDEOSPAGE_COLLECTION_ID}`, [
            Query.equal('Slug', slug)
        ]);
        promise.then(function (response) {
            setVideos(response.documents);
        }, function (error) {
             (error);
        });
    }, [router.isReady]);
    return <div>
    {videos.map((video)=>{
        return (
            <div>
<Head>
            <title>{video && video.Title}</title>
        </Head>
        <section className="text-gray-400 body-font">
            <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
                <iframe className="lg:w-1/2 md:w-3/6 w-5/6 mb-10 h-96 object-cover object-center rounded" src={video && video.EmededUrl} allowFullScreen />
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-9 font-medium text-white">{video && video.Title}</h1>
                    <p className="leading-relaxed mb-8">{video && video.Description}</p>
                    <div className="flex justify-center">
                        <Link target='_blank' href={`https://youtu.be/${video && video.VideoUrl}`}>
                            <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Watch Now</button>
                        </Link>
                    </div>
                    <div className="container w-full px-5 3/6 py-10 mx-auto flex items-center justify-center">
                        <div className="lg:w-2/3 border-gray-700 border-2 md:w-1/2 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
                            <h2 className="text-white text-2xl mb-5 font-medium title-font">Comments (Coming Soon...)</h2>
                            <div className="flex mb-4">
                                <input disabled={"true"} type={'text'} placeholder="Add your Comment" id="message" name="message" className="w-3/4 bg-gray-900 rounded border border-gray-700 focus:border-blue-500 text-base outline-none text-gray-300 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out mr-5 cursor-not-allowed" />
                                <button disabled={"true"} className="text-white bg-blue-400 cursor-not-allowed border-0 w- py-2 px-6 focus:outline-none rounded text-lg">Comment</button>
                            </div>
                            <div className="allcomments mt-5">
                                <h4 className='mb-3'>Soft Motion: Implementing Soon...</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </div>
        )
    })}
    </div>
}

export default Slug;