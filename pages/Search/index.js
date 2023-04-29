import { useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  const query = context.query.query; // extract query parameter from URL
  const apiUrl = `https://api.themoviedb.org/3/search/movie?`;
  const apiKey = `${process.env.API_KEY}`;

  const res = await fetch(`${apiUrl}api_key=${apiKey}&query=${query}`);
  const data = await res.json();

  if (!data || !data.results) {
    return {
      notFound: true, // render 404 page if there are no results
    };
  }

  return {
    props: {
      data,
    },
  };
}

function Search({ data }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.query || ""); // initialize query state with URL query parameter

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/Search?query=${query}`); // update URL with new query parameter
  };

  return (
    <>
      <div className="py-10">
        <form
          onSubmit={handleSubmit}
          className="intem-center flex justify-center gap-x-5"
        >
          <input
            className={`${inter.className} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 lg:w-auto`}
            type="search"
            value={query}
            onChange={handleInputChange}
          />
          <button
            className={`${inter.className} rounded p-2 font-medium shadow outline-1 outline-slate-600 hover:shadow-md hover:outline active:bg-slate-100`}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        <h5 className=" px-5 text-sm font-semibold tracking-wider text-gray-700">
          Total Result: {data.total_results}
        </h5>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-10 md:gap-5">
        {data.results.length > 0 ? (
          <>
            {data.results.map((data) => (
              <>
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
              </>
            ))}
          </>
        ) : (
          <h1 className=" tracking=-wider font-semibold">
            No results found...
          </h1>
        )}
      </div>
    </>
  );
}

export default Search;
