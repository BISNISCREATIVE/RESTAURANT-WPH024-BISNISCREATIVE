import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="text-2xl font-extrabold">Foody</div>
          <p className="text-sm text-muted-foreground mt-3">
            Enjoy homemade flavors & chef’s signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>
          <div className="mt-4 text-sm font-semibold">
            Follow on Social Media
          </div>
          <div className="flex gap-3 mt-2">
            <a
              aria-label="Facebook"
              className="h-10 w-10 rounded-full border border-white/20 grid place-items-center"
            >
              F
            </a>
            <a
              aria-label="Instagram"
              className="h-10 w-10 rounded-full border border-white/20 grid place-items-center"
            >
              I
            </a>
            <a
              aria-label="LinkedIn"
              className="h-10 w-10 rounded-full border border-white/20 grid place-items-center"
            >
              in
            </a>
            <a
              aria-label="TikTok"
              className="h-10 w-10 rounded-full border border-white/20 grid place-items-center"
            >
              t
            </a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/?q=">All Food</Link>
            </li>
            <li>
              <Link to="/?q=Nearby">Nearby</Link>
            </li>
            <li>
              <Link to="/?q=Discount">Discount</Link>
            </li>
            <li>
              <Link to="/?q=Best Seller">Best Seller</Link>
            </li>
            <li>
              <Link to="/?q=Delivery">Delivery</Link>
            </li>
            <li>
              <Link to="/?q=Lunch">Lunch</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Help</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#">How to Order</a>
            </li>
            <li>
              <a href="#">Payment Methods</a>
            </li>
            <li>
              <a href="#">Track My Order</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
