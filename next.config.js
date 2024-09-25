/** @type {import('next').NextConfig} */
// new config
const nextConfig = {
  reactStrictMode: false,
  // exportTrailingSlash has been changed to trailingSlash,
  trailingSlash: false,
  // serverRuntimeConfig: {
  //   timeout: 30, // or a higher value
  // },

  async headers() {
    return [
      {
        source: "/hotels/:hotelInfo/booking",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/:citySlugName",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/:citySlugName/:cityRegionSlugName",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=2592000 , must-revalidate",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/hotels/:hotelInfo/rooms",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/payment",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/login",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/profile",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/forgotPassword",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/bookingInformation",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },

  // experimental: {
  //   optimizeFonts: true,
  //   nextScriptWorkers: true,
  //   // workerThreads: false,
  //   // cpus: 1,
  // },

  images: {
    domains: [
      "icons8.com",
      "cdn.sanity.io",
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
      "images.staybook.in",
      "images.com",
      "firebasestorage.googleapis.com",
      "r1imghtlak.mmtcdn.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    loader: "default",
    dangerouslyAllowSVG: true,
  },

  env: {
    // Environment variables
    RAZORPAY_API_KEY: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
  },

  async rewrites() {
    // URL rewrites
    return [
      {
        source: "/api/paymentVerification",
        destination: "https://checkout.razorpay.com/v1/checkout.js",
      },
      // Add other rewrites if needed
    ];
  },

  // Webpack configuration changes
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: {
        // Inline the worker as a Blob object URL
        inline: true,
        // Name for the output file relative to the output.path
        filename: "static/workers/[name].[hash].worker.js", // Adjust the output path and filename as needed
        // Chunk name for the worker bundle
        chunkName: "static/workers/[name].[hash].worker.js", // Adjust as needed
      },
    });
    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.(ts|js)$/,
        loader: "worker-loader",
        options: {
          filename: "static/[hash].worker.js",
          publicPath: "/_next/static/",
        },
      });
    }
    if (dev) {
      config.devtool = "source-map";
    }
    // Other webpack modifications if required
    return config;
  },
  // Other Next.js configuration properties...
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({ nextConfig });
module.exports = nextConfig;
