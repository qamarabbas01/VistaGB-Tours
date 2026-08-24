import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import WishlistView from "@/components/WishlistView";
import { places, regions } from "@/data";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Wishlist",
  description: "Destinations you have saved for a future Gilgit-Baltistan trip.",
  path: "/wishlist",
});

export default function WishlistPage() {
  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Wishlist", path: "/wishlist" },
          ]),
          webPageJsonLd({
            name: "Wishlist",
            description: "Saved destinations for a VistaGB trip.",
            path: "/wishlist",
          }),
        ])}
      />
      <PageHeader
        label="Saved places"
        title="Wishlist"
        intro="Hearts on destination cards live on this device. Favourite valleys, lakes, and forts — then compare or request dates."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <WishlistView locations={[...regions, ...places]} />
        </div>
      </section>
    </div>
  );
}
