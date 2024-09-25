import { countriesData } from "@/lib/helper/countriesData";
import { EVISA_URL } from "@/lib/helper";
import Head from "next/head";
import { useRouter } from "next/router";

const Countries = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="mb-5 mt-5 rounded-xl bg-gradient-to-br from-white to-teal-200 p-5 shadow-xl">
        <h2 className="mb-6 text-3xl font-bold">
          Eligible Countries to Come to India
        </h2>
        <div className="grid grid-cols-2 justify-center gap-2 md:grid-cols-3">
          {countriesData.map((country, index) => (
            <div key={index}>
              <div
                title={`indian e visa eligibility link`}
                className="country-link flex items-center"
              >
                <p
                  className="mr-2 text-2xl"
                  style={{ fontFamily: "Noto Color Emoji" }}
                >
                  {country.flag}
                </p>
                <span
                  className="cursor-pointer truncate whitespace-nowrap text-lg hover:underline"
                  onClick={() =>
                    router.push(
                      `${EVISA_URL}/indian-e-visa-eligibility-for-${country.link}-citizens`,
                    )
                  }
                >
                  {country.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Countries;
