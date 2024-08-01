import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_URL}`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);

const Coupons = () => {
  function download(url, filename) {
    fetch(url).then(async function (t) {
      const b = await t.blob();
      var a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.setAttribute("download", filename);
      a.click();
    });
  }
  const [coupon, setCoupon] = useState('');
  const [allCoupons, setAllCoupons] = useState([]);
  const [quantity, setQuantity] = useState()

  useEffect(() => {
    let promise = databases.listDocuments(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_COUPOUNSPAGE_COLLECTION_ID}`);
    promise.then(function (response) {
      console.log(response.documents)
      setAllCoupons(response.documents);
    }, function (error) {
       (error);
    });
  }, []);

  const checkCoupon = () => {
    const selectedCoupon = allCoupons.find((c) => c.Title === coupon);
    console.log(allCoupons)
    if (!selectedCoupon) {
      toast.error('Coupon expired/does not exist...', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("hi")
      return;
    }

    const { Title, Quantity } = selectedCoupon;
    if (Quantity === 0) {
      toast.error('Coupon expired/does not exist...', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("hello")
      return;
    }

    setQuantity(true);

    toast.success('Coupon applied Successfully !', {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const updatedQuantity = Quantity - 1;

     (updatedQuantity, Title)
    let fileName;
    let documentId;
    if (Title == "FREEWINDOWSLOGO"){
      fileName = "1"
      documentId = "64a6e91424cbb0de934f"
    }
    else if (Title == "FREEBACKGROUND"){
      fileName = "2"
      documentId = "64a6e92b25a00ab527c4"
    }
    else if (Title == "FREEGIF"){
      fileName = "3"
      documentId = "64a6e93b13f3735880ff"
    }
    else if (Title == "FREEIMAGES"){
      fileName = "4"
      documentId = "64a6e94a73708dc949f3"
    }
    else if (Title == "FREENATUREBACKGROUND"){
      fileName = "5"
      documentId = "64a6e95a4bec0cd8581d"
    }
    else if (Title == "FREERANDOMBACKGROUND"){
      fileName = "6"
      documentId = "64a6e965c25c23f22c4b"
    }

    const promise = databases.updateDocument(`${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,`${process.env.NEXT_PUBLIC_APPWRITE_COUPOUNSPAGE_COLLECTION_ID}`, `${documentId}`, {
      Quantity: updatedQuantity
    });

    promise.then(function (response) {
         (response); // Success
    }, function (error) {
         (error); // Failure
    });

    switch (Title) {
      case 'FREEWINDOWSLOGO':
        download(`${process.env.NEXT_PUBLIC_URL}/files`, "WindowsLogo.zip")
        break;
      case 'FREEIMAGES':
        download(`${process.env.NEXT_PUBLIC_URL}/files`, "Images.zip")
        break;
      case 'FREEGIF':
        download(`${process.env.NEXT_PUBLIC_URL}/files`, "Gif.zip")
        break;
      case 'FREENATUREBACKGROUND':
        download(`${process.env.NEXT_PUBLIC_URL}/files`, "NATUREBACKGROUNDS.zip")
        break;
      case 'FREEBACKGROUND':
        download(`${process.env.NEXT_PUBLIC_URL}/files`, "RANDOMBACKGROUNDS.zip")
        break;
      case 'FREERANDOMBACKGROUND':
        download(`${process.env.NEXT_PUBLIC_URL}/files`, "RANDOMBACKGROUNDS.zip")
        break;
      default:
        break;
    }
}
const onChangeCoupon = (e) => {
  setCoupon(e.target.value);
};

  return (
    <div>
      <Head>
        <title>Apply Coupons & Download Gifts</title>
      </Head>
      <ToastContainer
        toastStyle={{ backgroundColor: 'rgb(17, 16, 35)' }}
        position="top-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <section className="text-white body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <span className="sm:text-3xl text-3xl mb-4 text-blue-600">Gifts</span>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Apply your coupon and download the gifts</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <input
                    value={coupon}
                    onChange={onChangeCoupon}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your coupon here..."
                    className="w-full bg-gray-900 bg-opacity-50 rounded border border-gray-800 focus:border-blue-500 focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={checkCoupon}
                  className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Apply
                </button>
              </div>
              <ul className="list-decimal mx-auto text-white">
                <h1 className="text-2xl">Coupons:</h1>
                <li>FREEWINDOWSLOGO</li>
                <li>FREEIMAGES</li>
                <li>FREEGIF</li>
                <li>FREENATUREBACKGROUND</li>
                <li>FREEBACKGROUND</li>
                <li>FREERANDOMBACKGROUND</li>
                <div className='mt-3'>Apply them and download files I used in My animations</div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coupons;