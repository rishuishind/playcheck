import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" title="icon" href="/brand_logo.ico" />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MPVHFDZ');
            `,
          }}
        />

        {/* Google Ads Performance Max Script */}
        {/* <Script
          id="google-ads-performance-max-cdn"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11250327005"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-performance-max-script"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11250327005');
            `,
          }}
        /> */}

        {/* Google Ads Script */}
        <Script
          id="google-ads-cdn"
          src="https://www.googletagmanager.com/gtag/js?id=G-7E8Z9ELM5E"
        />

        <Script
          defer
          id="google-ads-script"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7E8Z9ELM5E');
          `,
          }}
        />

        {/* Microsoft Clarity Heatmap Script */}
        <Script
          id="microsoft-clarity-heatmap"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "lvfj2zg3nk");
            `,
          }}
        />
      </Head>
      <body className="text-dark">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPVHFDZ"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
