import { useRouter } from "next/router";

export default function Custom500Page() {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="bg-light h-screen w-full">
      <div className="wrapper grid h-full place-items-center">
        <div className="max-w-xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            500 - Server-side error occurred
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Oops, something went wrong
            <br />
            Try to referesh the page or feel free to contact us if the problem
            persists.
          </p>
          <button
            onClick={refreshData}
            className="inline-block rounded-lg bg-primary/80 px-4 py-2 font-semibold text-white hover:bg-primary"
          >
            Refresh the page
          </button>
        </div>
      </div>
    </div>
  );
}
