import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Client, Databases, Query } from 'appwrite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new Client()
    .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

const EditProfile = () => {
    const customId = "custom-id-yes";
    const toastId = React.useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [documentId, setDocumentId] = useState('');

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
                 (response.documents);
            } catch (error) {
                 (error);
            }
        };

        if (email) {
            fetchData();
        }
    }, [email]);

    useEffect(() => {
         (accounts);
        if (accounts.length > 0) {
            setName(accounts[0].Name);
            setPassword(accounts[0].Password);
            setPhone(accounts[0].Phone);
            setDateOfBirth(accounts[0].Date_Of_Birth);
            setDocumentId(accounts[0].DocumentId);
        }
    }, [accounts]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const promise = databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_ACCOUNTS_COLLECTION_ID,
            documentId,
            {
                Name: name,
                Email: email,
                Password: password,
                Phone: phone,
                Date_Of_Birth: dateOfBirth,
                Premiem_Account: accounts[0].Premiem_Account,
                Premiem_Account_Boolean: accounts[0].Premiem_Account_Boolean,
            }
        );

        promise.then(
            function (response) {
                 (response);
                if (!toast.isActive(toastId.current)) {
                    toastId.current =
                        toast.success('Successfully Updated!', {
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
            },
            function (error) {
                 (error);
                if (!toast.isActive(toastId.current)) {
                    toastId.current =
                        toast.error('Failed Updated!', {
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
            }
        );
    };

    return (
        <div className="text-white p-6">
            <Head>
                <title>Edit Profile -- Soft Motion</title>
            </Head>
            <ToastContainer toastStyle={{ backgroundColor: "rgb(17, 16, 35)" }} position="bottom-left" autoClose={3500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover />
            <h1 className="text-2xl mb-4">Edit Profile</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name" className="block mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full bg-gray-800 rounded p-2 mb-4 text-white"
                />

                <label htmlFor="email" className="block mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    disabled={true}
                    value={email}
                    className="w-full bg-gray-800 rounded p-2 mb-4 text-white"
                />

                <label htmlFor="password" className="block mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-800 rounded p-2 mb-4 text-white"
                />

                <label htmlFor="phone" className="block mb-2">
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-gray-800 rounded p-2 mb-4 text-white"
                />

                <label htmlFor="dateOfBirth" className="block mb-2">
                    Date of Birth
                </label>
                <input
                    type="text"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    className="w-full bg-gray-800 rounded p-2 mb-4 text-white"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-auto rounded"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditProfile;