import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Client, Databases, Query } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const MySubscription = () => {
    const [accounts, setAccounts] = useState([]);
    const [subscription, setSubscription] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem('Email'));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                    process.env.NEXT_PUBLIC_APPWRITE_ACCOUNTS_COLLECTION_ID,
                    [Query.equal('Email', email)]
                );
                setAccounts(response.documents);
            } catch (error) {
                 (error);
            }
        };

        if (email) {
            fetchData();
        }
    }, [email]);

    useEffect(() => {
        if (accounts.length > 0 && accounts[0].Subscription_Status === 'Active') {
            setSubscription(true);
        }
    }, [accounts]);

    return (
        <div>
            <Head>
                <title>My Subscription -- Soft Motion</title>
            </Head>
            {!subscription ? (
                <section className="text-gray-400 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Buy Subscription</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">You don't have any subscription. Let's buy it</p>
                            <div className="flex mx-auto border-2 border-blue-500 rounded overflow-hidden mt-6">
                                <button className="py-1 px-4 bg-blue-500 text-white focus:outline-none">Monthly</button>
                                <button disabled className="py-1 px-4 text-gray-300 focus:outline-none">Annually (Coming soon...)</button>
                            </div>
                        </div>
                        <div className="flex flex-wrap -m-4">
                            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                                <div className="h-full p-6 rounded-lg border-2 border-blue-500 flex flex-col relative overflow-hidden">
                                    <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">BASIC (Current)</h2>
                                    <h1 className="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">Free</h1>
                                    <p className="flex items-center text-gray-400 mb-2">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </span>
                                        Use Community
                                    </p>
                                    <p className="flex items-center text-gray-400 mb-2">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Use Coupons
                                    </p>
                                    <p className="flex items-center text-gray-400 mb-2">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </span>
                                        Get Badges
                                    </p>
                                    <p className="flex items-center text-gray-400 mb-6">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </span>
                                        Comment on Videos
                                    </p>
                                    <button disabled className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none rounded">Buy Now
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                                <div className="h-full p-6 rounded-lg border-2 border-blue-500 flex flex-col relative overflow-hidden">
                                    <span className="bg-blue-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">RECOMMENDED</span>
                                    <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">PRO</h2>
                                    <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-800">
                                        <span>₹199</span>
                                        <span className="text-lg ml-1 font-normal text-gray-400">/mo</span>
                                    </h1>
                                    <p className="flex items-center text-gray-400 mb-2">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Use Community
                                    </p>
                                    <p className="flex items-center text-gray-400 mb-2">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Use Coupons
                                    </p>
                                    <p className="flex items-center text-gray-400 mb-2">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </span>
                                        Get Badges
                                    </p>
                                    <p className="flex items-center text-gray-400 mb-6">
                                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </span>
                                        Comment on Videos
                                    </p>
                                    <button disabled className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none rounded">Buy Now
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                // Subscription section content
                <section className="text-gray-400 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-center">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
                                Your Subscription Details
                            </h1>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                                Thank you for being a premium subscriber!
                            </p>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                                Your subscription is active and you have access to exclusive features and premium content.
                            </p>
                        </div>
                        {accounts.map((acc) => {
                            return (
                                <div className='text-center mt-3'>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Here are some details of your subscription:</p>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Subscription started on: {acc.Subscription_Started_On}</p>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Subscription ends on: {acc.Subscription_Ends_On}</p>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Your plan type: {acc.Plan} based plan</p>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Payment Status: {acc.PayementStatus}</p>
                                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Payment: ₹{acc.Payment}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MySubscription;
