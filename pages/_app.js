import "@/styles/globals.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import Header from "@/components/header";
import Router, { useRouter, withRouter } from "next/router";
import NProgress from "nprogress"; // import the library
import "nprogress/nprogress.css"; // import the CSS
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

Router.events.on("routeChangeStart", () => {
  NProgress.start(); // show the progress bar
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done(); // hide the progress bar
});

Router.events.on("routeChangeError", () => {
  NProgress.done(); // hide the progress bar
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const ScrollProviderWithRouter = withRouter(LocomotiveScrollProvider);

  return (
    <>
      <ScrollProviderWithRouter
        // Options
        options={{
          // el: typeof window !== 'undefined' ? window : null,
          name: "scroll-instance",
          direction: "vertical",
          smooth: true,
          smoothing: 0.08,
          touchMultiplier: 2.5,
          firefoxMultiplier: 50,
          touchSmoothMultiplier: 2,
          mouseMultiplier: 1,
          preventDefault: true,
          reloadOnContextChange: false,
          resetNativeScroll: false,
          resetNativeScrollDelay: 0,
          lerp: 0.1,
          class: "",
          offset: 0,
          reloadOnZoom: false,
          tablet: {
            smooth: true,
            direction: "horizontal",
            breakpoint: 1024,
          },
          smartphone: {
            smooth: true,
            direction: "horizontal",
            breakpoint: 640,
          },
          passive: false, // allow scroll events to be prevented
        }}
        watch={[]}
      >
        <div data-scroll-container>
          <div data-scroll-section>
              <Header />
              <Component {...pageProps} />
          </div>
        </div>
      </ScrollProviderWithRouter>
    </>
  );
}
