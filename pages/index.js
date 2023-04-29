import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  const apiUrl = "https://api.themoviedb.org/3/trending/all/day";
  const apiKey = `${process.env.API_KEY}`;

    const res = await fetch(`${apiUrl}?api_key=${apiKey}`);
    const data = await res.json();

    return {
      props: { data },
    };
}

export default function Index({ data }) {
  if (!data || !data.results) {
    return <div>Error: Failed to load movie data</div>;
  }

  return (
    <>
      <Head>
        <title>Ali&apos;s Movies</title>
        
        <meta
          name="description"
          content="Ali's Movies App | Download Premium Quality Movies for Free"
        />
        <meta name="keywords" content="Ali's Movies, Movies Downloading" />
      </Head>
      <div className=" mx-auto mt-10 flex max-w-7xl flex-wrap items-start justify-center gap-10 md:gap-5">
        {data.results.map((data) => (
          <motion.div
            className="mx-0 w-32 max-w-full md:mx-10 md:w-56 lg:w-[250px]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            key={data.original_title}
          >
            <div
              data-scroll
              data-scroll-speed="2"
              data-scroll-position="top"
              data-scroll-direction="vertical"
              className="rounded-lg border border-slate-400 bg-slate-100"
              key={data.id}
            >
              <Link href={`/Movies/${data.id}`}>
                {/* <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={`Globbone Image: ${data.original_title}`}
                  className="rounded-tr-lg rounded-tl-lg"
                /> */}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={`Globbone Image: ${data.original_title}`}
                  className="rounded-tl-lg rounded-tr-lg"
                  width={500}
                  height={600}
                  priority={true}
                />
                <div className="bottom-0 z-10 m-5">
                  <h2 className="font-inter my-3 line-clamp-1 text-xl font-semibold">
                    {data.original_title}
                  </h2>
                  <p className="font-inter line-clamp-3 max-w-[1000px] text-base text-slate-700">
                    {data.overview}
                  </p>
                  <br />
                  <p className="font-inter max-w-[1000px] text-base text-slate-700">
                    Release Date:
                    <br />
                    {data.release_date}
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
