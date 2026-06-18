/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.brecorder.com" },
      { protocol: "https", hostname: "www.ajktours.com" },
      { protocol: "https", hostname: "northbackend.northonwheels.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "guidetourismpakistan.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "visitgilgitbaltistan.gov.pk" },
      { protocol: "https", hostname: "images.saymedia-content.com" },
      { protocol: "https", hostname: "vepakistan.com" },
      { protocol: "https", hostname: "visitsilkroad.org" },
    ],
  },
};

export default nextConfig;
