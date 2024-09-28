/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/bhajan",
                permanent: true,
            },
        ];
    },
    reactStrictMode: false,
    // images: {
    //     remotePatterns: [
    //         {
    //             hostname: "placehold.jp",
    //             protocol: "https",
    //         },
    //         {
    //             hostname: "shilpagyabucket.s3.us-east-1.amazonaws.com",
    //             protocol: "https",
    //         },
    //         {
    //             hostname: "d4jdn74kajj4z.cloudfront.net",
    //             protocol: "https",
    //         },
    //     ],
    // },

    //   async headers() {
    // //     const cspHeader = `
    // //     default-src 'self';
    // //     script-src 'self' 'unsafe-eval' 'unsafe-inline';
    // //     style-src 'self' 'unsafe-inline';
    // //     img-src 'self' blob: data:;
    // //     font-src 'self';
    // //     object-src 'none';
    // //     base-uri 'self';
    // //     form-action 'self';
    // //     frame-ancestors 'none';
    // //     upgrade-insecure-requests;
    // // `;

    //     return [
    //       {
    //         source: "/(.*)",
    //         headers: [
    //           {
    //             key: "X-Frame-Options",
    //             value: "DENY",
    //           },
    //           {
    //             key: "Strict-Transport-Security",
    //             value: "max-age=31536000",
    //           },
    //           {
    //             key: "X-Content-Type-Options",
    //             value: "nosniff",
    //           },
    //           {
    //             key: "Permissions-Policy",
    //             value: "camera=() , geolocation=(), microphone=() ",
    //           },
    //           {
    //             key: "Referrer-Policy",
    //             value: "origin-when-cross-origin",
    //           },
    //           // {
    //           //   key: "Content-Security-Policy",
    //           //   value: cspHeader.replace(/\n/g, ""),
    //           // },
    //         ],
    //       },
    //     ];
    //   },
};

export default nextConfig;
