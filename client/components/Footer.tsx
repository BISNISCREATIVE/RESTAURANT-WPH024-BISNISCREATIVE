export default function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-extrabold">Foody</div>
          <p className="text-sm text-muted-foreground mt-3">
            Enjoy homemade flavors & chef’s signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>All Food</li>
            <li>Nearby</li>
            <li>Discount</li>
            <li>Best Seller</li>
            <li>Delivery</li>
            <li>Lunch</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Help</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>How to Order</li>
            <li>Payment Methods</li>
            <li>Track My Order</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
