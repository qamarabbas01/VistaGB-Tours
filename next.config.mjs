/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "i.dawn.com" },
      { protocol: "https", hostname: "flypakistan.pk" },
      { protocol: "https", hostname: "blogger.googleusercontent.com" },
      { protocol: "https", hostname: "naturehikepakistan.pk" },
      { protocol: "https", hostname: "www.imusafir.pk" },
      { protocol: "https", hostname: "www.ajktours.com" },
      { protocol: "https", hostname: "northbackend.northonwheels.com" },
      { protocol: "https", hostname: "guidetourismpakistan.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "visitgilgitbaltistan.gov.pk" },
      { protocol: "https", hostname: "www.visitgilgitbaltistan.gov.pk" },
      { protocol: "https", hostname: "images.saymedia-content.com" },
      { protocol: "https", hostname: "vepakistan.com" },
      { protocol: "https", hostname: "visitsilkroad.org" },
      { protocol: "https", hostname: "cdn.prod.rexby.com" },
      { protocol: "https", hostname: "i.brecorder.com" },
      { protocol: "https", hostname: "globerovers.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
