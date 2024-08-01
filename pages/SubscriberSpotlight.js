import React from 'react'
import Head from 'next/head';
import Link from 'next/link';

const SubscriberSpotlight = () => {
  return (
    <div className="text-white mt-5">
      <Head>
        <title>Subscriber Spotlight - Soft Motion</title>
      </Head>
      <header className="bg-gradient-to-r from-blue-500 to-blue-900 py-8 mx-96 rounded-md">
        <h1 className="text-4xl font-bold text-white text-center">Subscriber Spotlight</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How to apply?</h2>
          <p className="text-lg">
            You can upload your animations to send it to me and then I will review it and you will be showcast on my  <Link target='_blank' href="https://youtube.com/@SoftMotion"><span className="text-blue-500 hover:text-blue-700 active:text-blue-900">channel</span></Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Where to apply?</h2>
          <p className="text-lg">
            If you are willing to apply so click <Link href="/SubscriberSpotlightUpload"><span className="text-blue-500 hover:text-blue-700 active:text-blue-900">here</span>
            </Link></p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">All Spotlight channels/people</h2>
          <p className="text-lg">
            <Link href="https://youtube.com/@DreadfulDragons">
              <span className="text-blue-500 hover:text-blue-700 active:text-blue-900">@DreadfulDragons</span>
            </Link>-- Antriksh Verma
            <br/>
            <Link href="https://youtube.com/@hunterdass2011">
              <span className="text-blue-500 hover:text-blue-700 active:text-blue-900">@hunterdass2011</span>
            </Link>-- Hunter dass or 9875
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How it works?</h2>
          <p className="text-lg">
            You upload your animations and it will be reviewed within 5 days and will be showcast on my channel very soon (Like in 10 days -- Only on Sunday)
          </p>
        </section>
      </main>
    </div>
  )
}

export default SubscriberSpotlight