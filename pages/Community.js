import Head from 'next/head';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Community = () => {
  const customId = "custom-id-yes";
  const toastId = React.useRef(null);
  if (!toast.isActive(toastId.current)) {
    toastId.current =
      toast.info('We are working on this page! Still enjoy using community in iframe.', {
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
  return (
    <div>
      <Head>
        <title>SM Community -- Soft Motion</title>
      </Head>
      <ToastContainer toastStyle={{ backgroundColor: "rgb(17, 16, 35)" }} position="bottom-left" autoClose={3500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover />
      <iframe src="https://sm-community--softmotion.repl.co/" frameborder="0"></iframe>
    </div>
  )
}

export default Community