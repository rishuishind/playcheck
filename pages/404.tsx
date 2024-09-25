import Link from "next/link";
import { useState } from "react";

export default function Custom404() {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const submit404Response = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notFound", {
        method: "POST",
        body: JSON.stringify({
          url: window.location.href,
          path: window.location.pathname,
          origin: window.location.origin,
          host: window.location.host,
          userAgent: window.navigator.userAgent,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const { message } = await res.json();
      if (res.status === 200) {
        setMessageSent(true);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error?.message || error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="grid min-h-screen place-items-center bg-light px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-dark">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn&#39;t find the page you&#39;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              title="home page link"
              className="focus-visible:dark/60 rounded-md bg-dark px-4 py-2.5 text-sm font-semibold text-light shadow-sm hover:bg-dark/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Go back home
            </Link>
            <button
              onClick={submit404Response}
              title="support page button"
              className="group rounded-md px-4 py-2.5 text-sm font-semibold text-dark hover:bg-dark/10"
            >
              {loading ? "please wait..." : "Contact support"}
              <span
                aria-hidden="true"
                className="inline-block translate-x-1 transition-transform group-hover:translate-x-2 motion-reduce:transform-none"
              >
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </section>

      {messageSent && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800">
              Thank you for reporting the problem!
            </h3>
            <p className="mt-4 mb-4 text-gray-600">
              We apologize for the inconvenience, and will try to resolve this
              as soon as posible on urgent bases.
            </p>
            <Link
              href={"/hotels"}
              title={"go to homepage"}
              className="focus-visible:dark/60 rounded-md bg-dark px-4 py-2.5 text-sm font-semibold text-light shadow-sm hover:bg-dark/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Close
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
