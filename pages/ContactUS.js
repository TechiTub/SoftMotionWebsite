import Head from 'next/head'
import React, { useState } from 'react'
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

const ContactUS = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [message, setmessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { name, email, message };
        const promise = databases.createDocument(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_COUNTACTPAGE_COLLECTION_ID}`, ID.unique(), {
            Name: name,
            Email: email,
            Message: message
        });

        promise.then(function (response) {
             (response);
        }, function (error) {
             (error);
        });
    }

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setname(e.target.value)
        }

        else if (e.target.name == 'email') {
            setemail(e.target.value)
        }

        else if (e.target.name == 'message') {
            setmessage(e.target.value)
        }
    }
    return (
        <div>
            <Head>
                <title>Contact Us -- Soft Motion</title>
            </Head>
            <section className="text-gray-400 body-font relative">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Contact Us</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Feel free while contacting us!</p>
                    </div>
                    <div className="lg:w-full md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label for="name" className="leading-7 text-sm text-gray-400">Name</label>
                                    <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label for="email" className="leading-7 text-sm text-gray-400">Email</label>
                                    <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="message" className="leading-7 text-sm text-gray-400">Message</label>
                                    <textarea value={message} onChange={handleChange} id="message" name="message" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={handleSubmit} className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactUS