import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

// const disableInspect = () => {
//   useEffect(() => {
//     const handleContextMenu = (event) => {
//       event.preventDefault();
//     };

//     const handleKeyDown = (event) => {
//       if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) {
//         event.preventDefault();
//       }
//     };

//     window.addEventListener('contextmenu', handleContextMenu);
//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('contextmenu', handleContextMenu);
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
// };

export default function App({ Component, pageProps }) {

  const [progress, setProgress] = useState(0)
  const router = useRouter()
  // disableInspect();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(50)
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  })

  return <>
    <LoadingBar
      color='#001686'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={1500}
    />
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </>
}
