import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Client, Databases, ID } from 'appwrite'

const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)

const databases = new Databases(client)

const SignUp = () => {
  const [accounts, setAccounts] = useState([])
  const [allEmail, setAllEmail] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ACCOUNTS_COLLECTION_ID
        )
        setAccounts(response.documents)
      } catch (error) {
         (error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const emails = accounts.map((acc) => acc.Email)
    setAllEmail(emails)
  }, [accounts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (allEmail.includes(email)) {
      let red = document.getElementById('red')
      red.innerHTML = 'This email already exists!'
      red.style.visibility = 'visible'
    } else if (password !== confirmPassword) {
      let red = document.getElementById('red')
      red.innerHTML = "Password doesn't match confirmed password!"
      red.style.visibility = 'visible'
    } else {
      const documentId = ID.unique()

      const data = {
        DocumentId: documentId,
        Name: name,
        Email: email,
        Password: password,
        Phone: '123456789',
        Date_Of_Birth: dateOfBirth,
        Premiem_Account: 'No',
        Premiem_Account_Boolean: false
      }

      try {
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ACCOUNTS_COLLECTION_ID,
          data
        )

         ('Success:', response)
        alert(
          "Thanks for creating an account! You're now logged in to Soft Motion Website!"
        )
      } catch (error) {
        alert("An error occured! Please contact if problem not resolves automatically.")
      }

      localStorage.setItem('Email', email)
      localStorage.setItem('Password', password)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'email') {
      setEmail(value.toLowerCase())
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'name') {
      setName(value)
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value)
    } else if (name === 'phoneNo') {
      setPhoneNo(value)
    } else if (name === 'dateOfBirth') {
      setDateOfBirth(value)
    }
  }

    return (
        <div>
            <Head>
                <title>SignUp to Soft Motion</title>
            </Head>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto" src="logo.png" alt="Soft Motion" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST">
                        <div>
                            <div className="mt-2">
                                <input placeholder='Enter your name...' value={name} onChange={handleChange} id="name" name="name" type="text" required className="block w-full rounded-tr-md rounded-tl-md border-t-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 px-3 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-900 outline-none sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Enter your email...' value={email} onChange={handleChange} id="email" name="email" type="email" required className="block w-full py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-3 focus:ring-blue-600 bg-gray-900 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Enter your password...' value={password} onChange={handleChange} id="password" name="password" type="password" required className="block w-full py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-3 focus:ring-blue-600 bg-gray-900 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Confirm your password...' value={confirmPassword} onChange={handleChange} id="confirmPassword" name="confirmPassword" type="password" required className="block w-full py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-3 focus:ring-blue-600 bg-gray-900 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Enter your phone number...' value={phoneNo} onChange={handleChange} id="number" name="phoneNo" type="number" required className="block w-full py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-3 focus:ring-blue-600 bg-gray-900 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input placeholder='Enter your date of birth...' value={dateOfBirth} onChange={handleChange} id="dateOfBirth" name="dateOfBirth" type="date" required className="block w-full rounded-br-md rounded-bl-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-3 focus:ring-blue-600 bg-gray-900 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button onClick={handleSubmit} type="submit" className="flex w-full justify-center  rounded-md bg-blue-600 px-3 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-blue-900 focus-visible:outline-blue-600">Sign in</button>
                        </div>
                    </form>
                    <p className='mt-5 text-center text-lg text-red-600' id="red"></p>
                    <p className="mt-3 text-center text-sm text-gray-100">
                        Not have an account?
                        <Link href={"/SignUp"}><span className="font-semibold ml-1 leading-6 text-blue-600 hover:text-blue-500">Sign Up</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp