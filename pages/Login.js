import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

const Login = () => {
    const [accounts, setAccounts] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      let promise = databases.listDocuments(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_ACCOUNTS_COLLECTION_ID}`);
      promise.then(function (response) {
         (response)
        setAccounts(response.documents);
      }, function (error) {
         (error);
      });
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        for (let i = 0; i < accounts.length; i++) {
          let tryMail = accounts[i]['Email'].toLowerCase();
          if (tryMail == email) {
             (`Yes, Email ${tryMail} email is ${email}`)
            let tryPassCode = accounts[i]['Password'];
            if (tryPassCode == password) {
              localStorage.clear()
              localStorage.setItem("Email", email);
              localStorage.setItem("Password", password);
              localStorage.setItem("Login", "true");
              localStorage.setItem("i", i + 1);
              alert("You are now logged in successfully!")
              window.location.replace("/")
              break
            }
          }
          else {
            if(i == accounts.length){
              alert("Invalid Details!");
            }
             (`No, Email ${tryMail} email is ${email}`)
          }
  
        }
      } catch (error) {
        alert("Something went wrong! Please try again!")
         ("Error: " + error)
      }
    };
  
    const handleChange = async (e) => {
      if (e.target.name == 'email') {
        setEmail(e.target.value.toLowerCase());
      }
      else if (e.target.name == 'password') {
        setPassword(e.target.value);
      }
    }

    return (
        <div>
            <Head>
                <title>Login to Soft Motion</title>
            </Head>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto" src="logo.png" alt="Soft Motion" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
                            <div className="mt-2">
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 px-3 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-900 outline-none sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6">Password</label>
                            </div>
                            <div className="mt-2">
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-3 focus:ring-blue-600 bg-gray-900 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-blue-900 focus-visible:outline-blue-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-100">
                        Not have an account?
                        <Link href={"/SignUp"}><span className="font-semibold ml-1 leading-6 text-blue-600 hover:text-blue-500">Sign Up</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
