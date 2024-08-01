import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const MyProfile = () => {
  const [accounts, setAccounts] = useState([]);
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

  return (
    <div>
      <Head>
        <title>My Profile -- Soft Motion</title>
      </Head>
      {accounts.map((acc) => (
        <section className="text-gray-400 body-font" key={acc.$id}>
          <div className="container px-5 py-10 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-white text-lg">{acc.Name}</h2>
                    <div className="w-12 h-1 bg-blue-500 rounded mt-2 mb-4"></div>
                    <p className="text-base text-gray-400">{acc.Email}</p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mb-4">
                    Date Of Birth: {acc.Date_Of_Birth}
                    <br />
                    Phone Number: {acc.Phone}
                    <br />
                    Premiem Account: {acc.Premiem_Account}
                    {acc.Premiem_Account_Boolean && (
                      <>
                        <br />
                        Subscription Status: {acc.Subscription_Status}
                      </>
                    )}
                    {acc.Premiem_Account_Boolean && (
                      <>
                        <br />
                        Subscription Started On: {acc.Subscription_Started_On}
                      </>
                    )}
                    {acc.Premiem_Account_Boolean && (
                      <>
                        <br />
                        Subscription Ends On: {acc.Subscription_Ends_On}
                      </>
                    )}
                  </p>
                  <Link href="/EditProfile" className="text-blue-400 inline-flex items-center">
                    Edit Profile
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default MyProfile;
