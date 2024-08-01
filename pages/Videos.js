import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

const Videos = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    let promise = databases.listDocuments(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_VIDEOSPAGE_COLLECTION_ID}`);
    promise.then(function (response) {
       (response)
      setVideos(response.documents);
    }, function (error) {
       (error);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Videos - Soft Motion</title>
      </Head>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap-reverse justify-start -m-4">
            {videos.map((video) => {
              return (
                <div className="p-4 md:w-1/4">
                  <div className="h-full border-2 bg-gray-950 border-gray-900 rounded-lg overflow-hidden">
                    <img className="lg:h-48 md:h-36 w-full" src={`${video && video.Image}.png`} alt={video && video.Title} />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{video && video.Series_Name}</h2>
                      <h1 className="title-font text-lg font-medium text-white mb-3">{video && video.Title}</h1>
                      <div className="flex items-center flex-wrap">
                        <Link href={`/Videos/${video && video.Slug}`}>
                          <span className="text-blue-400 inline-flex items-center mr-auto md:mb-2 lg:mb-0">Watch Now
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </span>
                        </Link>
                        <span className="text-gray-500 inline-flex items-center leading-none ml-auto text-sm">
                          <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>{video && video.Comment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Videos