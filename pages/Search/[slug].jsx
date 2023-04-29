import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const apiUrl = `https://api.themoviedb.org/3/movie/${slug}`;
  const apiKey = `${process.env.API_KEY}`;

  const res = await fetch(`${apiUrl}?api_key=${apiKey}`);
  const data = await res.json();

  const upShrinkUrl = `https://upshrink.com/api?api=ad17c2dea4ffed668f6f3cbb7be31fc27da56637&url=https://olamovies.cloud/?s=${data.original_title}`;
  const upShrinkUrl1 = `https://upshrink.com/api?api=ad17c2dea4ffed668f6f3cbb7be31fc27da56637&url=https://katmoviehd.vg/?s=${data.original_title}`;
  const upShrinkUrl2 = `https://upshrink.com/api?api=ad17c2dea4ffed668f6f3cbb7be31fc27da56637&url=https://uhdmovies.vip/?s=${data.original_title}`;

  const resShort = await fetch(upShrinkUrl);
  const shortUrl = await resShort.json();

  const resShort1 = await fetch(upShrinkUrl1);
  const shortUrl1 = await resShort1.json();

  const resShort2 = await fetch(upShrinkUrl2);
  const shortUrl2 = await resShort2.json();

  return {
    props: {
      data,
      shortUrl,
      shortUrl1,
      shortUrl2,
    },
  };
}

function formatBudget(budget) {
  if (budget >= 1000000000) {
    return `$${(budget / 1000000000).toFixed(1)} Billion`;
  } else if (budget >= 1000000) {
    return `$${(budget / 1000000).toFixed(1)} Million`;
  } else if (budget >= 1000) {
    return `$${(budget / 1000).toFixed(1)} k`;
  } else {
    return `$${budget}`;
  }
}

function Slug({ data, shortUrl, shortUrl1, shortUrl2 }) {
  const router = useRouter();
  const { slug } = router.query;
  const x = router.back;

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <div key={data.id}>
        <button
          className={` ${inter.className} mx-10 p-4 font-medium text-gray-500 underline-offset-4 hover:underline`}
          onClick={x}
        >
          Back
        </button>
        <div className=" relative m-10 mb-20 grid grid-cols-4 grid-rows-3 gap-5">
          <div className=" col-start-1 col-end-3 row-start-1 row-end-2 flex flex-col items-start justify-evenly rounded-lg bg-slate-200 p-5  shadow-lg">
            <span className=" text-sm font-semibold uppercase tracking-wider text-slate-800/50">
              Title
            </span>
            <h1
              className={`${inter.className} text-start text-4xl font-bold tracking-wider`}
            >
              {data.original_title}
            </h1>
          </div>

          <div className=" col-start-3 col-end-5 row-start-1 row-end-3 flex flex-col items-start justify-evenly rounded-lg bg-slate-200 p-5 shadow-lg">
            <p
              className={`${inter.className} text-sm font-semibold uppercase tracking-wider text-slate-800/50`}
            >
              Overview
            </p>
            <p className={`${inter.className} mb-5 font-semibold`}>
              {data.overview}
            </p>
          </div>

          <div className=" col-start-3 col-end-5 row-start-3 row-end-4 flex flex-col items-start justify-between rounded-lg bg-slate-200 p-5 shadow-lg">
            <h1>Budget: {formatBudget(data.budget)}</h1>
            <h1>Revenue: {formatBudget(data.revenue)}</h1>
            <p>Release Date: {data.release_date}</p>
            <Link
              href={`https://www.imdb.com/title/${data.imdb_id}`}
              target="_blank"
              className=" hover:underline"
            >
              IMDB
            </Link>
            <div className="flex items-center justify-center gap-1">
              <p>Ola Movies:</p>
              <Link href={shortUrl.shortenedUrl} target="_blank">
                Download
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p>KatMovieHD:</p>
              <Link href={shortUrl1.shortenedUrl} target="_blank">
                Download
              </Link>
              {/* <p>{shortUrl}</p> */}
            </div>
            <div className="flex items-center justify-center gap-1">
              <p>UHD Movies:</p>
              <Link href={shortUrl2.shortenedUrl} target="_blank">
                Download
              </Link>
            </div>
          </div>
          <div className=" col-start-1 col-end-3 row-start-2 row-end-4 flex flex-col items-center justify-between rounded-lg bg-slate-200 p-5 shadow-lg ">
            <Image
              width={600}
              height={500}
              className=" w-72 rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={`Ali's Movies | ${data.original_title}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slug;
