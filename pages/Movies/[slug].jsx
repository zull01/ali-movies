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

  const upShrinkUrl = `https://upshrink.com/api?api=ad17c2dea4ffed668f6f3cbb7be31fc27da56637&url=https://katmoviehd.vg/?s=${data.original_title}`;

  const resShort = await fetch(upShrinkUrl);
  const shortUrl = await resShort.json();

  return {
    props: {
      data,
      shortUrl,
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

function Slug({ data, shortUrl }) {
  const router = useRouter();
  const { slug } = router.query;
  const x = router.back;

  const upShrink =
    "https://upshrink.com/api?api=ad17c2dea4ffed668f6f3cbb7be31fc27da56637&url=https://";

  return (
    <>
      <Head>
        <title>Ali&apos;s Movies | {data.original_title.slice(0, 57)}</title>
        <meta name="description" content={data.overview.slice(0, 155)} />
        <meta name="keywords" content={data.overview} />
        <meta property="og:title" content={data.original_title} />
        <meta property="og:description" content={data.overview}/>
        <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${data.poster_path}`}/>
      </Head>
      <div data-scroll-section key={data.id}>
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
            <h5 className="m-0 text-base font-semibold">
              Budget: {formatBudget(data.budget)}
            </h5>
            <h5 className="m-0 text-base font-semibold">
              Revenue: {formatBudget(data.revenue)}
            </h5>
            <h5 className="m-0 text-base font-semibold">
              Release Date: {data.release_date}
            </h5>
            <h5 className="m-0 text-base font-semibold">
              Check on &nbsp;
              <Link
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                target="_blank"
                className=" hover:underline"
              >
                IMDB
              </Link>
            </h5>
            <div className=" item-center my-5 flex justify-center gap-x-5">
              <div className="item-center flex flex-wrap justify-start gap-x-5">
                <h4 className="m-0 font-semibold">Genres:</h4>
                {data.genres.map((genre) => (
                  <>
                    <div>
                      <p
                        className="m-0 rounded-full bg-slate-600 px-4 py-2 text-white shadow-lg"
                        key={genre.id}
                      >
                        {genre.name}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className=" col-start-3 col-end-5 row-start-3 row-end-4 flex flex-col items-start justify-between rounded-lg bg-slate-200 p-5 shadow-lg">
            <p
              className={`${inter.className} text-sm font-semibold uppercase tracking-wider text-slate-800/50`}
            >
              Download
            </p>

            <div className="flex items-start justify-center gap-1">
              <p>Ola Movies:</p>
              <Link
                href={`https://olamovies.cloud/?s=${data.original_title}`}
                target="_blank"
              >
                Download
              </Link>
            </div>
            <div className="flex items-start justify-center gap-1">
              <p>KatMovieHD:</p>
              <Link href={shortUrl.shortenedUrl} target="_blank">
                Download
              </Link>
              <Link
                href={`${upShrink}katmoviehd.vg/?s=${data.original_title}`}
                target="_blank"
              >
                Download
              </Link>
              {/* <p>{shortUrl}</p> */}
            </div>
            <div className="flex items-start justify-center gap-1">
              <p>UHD Movies:</p>
              <Link
                href={`https://uhdmovies.vip/?s=${data.original_title}`}
                target="_blank"
              >
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
