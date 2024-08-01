import ImageSlider from '@/components/ImageSlider';
import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

export default function Home() {

  const customId = "custom-id-yes";
  const toastId = React.useRef(null);
  if (!toast.isActive(toastId.current)) {
    toastId.current =
      toast.info('Welcome to Soft Motion Website!', {
        position: "bottom-left",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        toastId: customId,
      });
  }
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    let promise = databases.listDocuments(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_HOMEPAGE_COLLECTION_ID}`);
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
        <title>Soft Motion's Website</title>
      </Head>
      <ToastContainer toastStyle={{ backgroundColor: "rgb(17, 16, 35)" }} position="bottom-left" autoClose={3500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover />
      <div height={'56vh'} className="w-full flex justify-center mt-5">
        <ImageSlider height={'56vh'} className="rounded-md mt-5" />
      </div>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">SM Suggestions: </h1>
              <div className="h-1 w-20 bg-blue-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {videos.map((video) => {
              return (
                <div className="xl:w-1/4 md:w-1/2 p-4 h-96">
                  <Link href={`/Videos/${video && video.Slug}`}>
                    <div className="bg-gray-950 border-2 border-gray-900 bg-opacity-40 p-6 rounded-lg">
                      <img className="h-40 rounded w-full object-cover object-center mb-6" src={`${video && video.Image}.png`} alt={video && video.Title} />
                      <h3 className="tracking-widest text-blue-400 text-xs font-medium title-font mb-3">{video && video.Series_Name}</h3>
                      <h2 className="text-lg text-white font-medium title-font mb-4">{video && video.Title}</h2>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}