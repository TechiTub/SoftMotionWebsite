import Head from 'next/head';
import Link from 'next/link';

const About = () => {
  return (
    <div className="text-white mt-5">
      <Head>
        <title>About - Soft Motion</title>
      </Head>
      <header className="bg-gradient-to-r from-blue-500 to-blue-900 py-8 mx-96 rounded-md">
        <h1 className="text-4xl font-bold text-white text-center">Welcome to Soft Motion</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg">
            Soft Motion is a YouTube channel dedicated to creating captivating Windows animation series.
            We specialize in producing animated content with unique and engaging storylines.
            Join us as we bring the world of Windows animations to life.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <p className="text-lg">
            At Soft Motion, we create immersive animation series centered around Windows.
            Our videos showcase the fascinating world of technology, exploring concepts such as operating systems, software, and computer interactions.
            Get ready to embark on a visual journey like no other!
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Why We Do It</h2>
          <p className="text-lg">
            We are passionate about combining technology and storytelling to create engaging content for our viewers.
            Through our animation series, we aim to entertain, educate, and inspire people with the wonders of the Windows ecosystem.
            We believe in the power of animation to make complex concepts accessible and enjoyable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg">
            We invite you to join the Soft Motion community and explore the fascinating world of Windows animations with us.
            Subscribe to our YouTube channel to stay updated on our latest series, upcoming projects, and exciting announcements.
            Together, let's dive into the realm of technology and imagination!
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg">
            If you have any questions, feel free to reach out to us.
            You can contact us by clicking{' '}
            <Link href="/ContactUS">
              <span className="text-blue-500 hover:text-blue-700 active:text-blue-900">here</span>
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
