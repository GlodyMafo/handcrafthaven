export default function Footer() {
  return (
    <footer
      className="mt-16"
      style={{ backgroundColor: "#102820", color: "#F5F2ED" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3 text-sm">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#CABA9C" }}>
            Handcrafted Haven
          </h3>
          <p className="opacity-80">
            Discover unique handmade products crafted with passion by talented creators.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2" style={{ color: "#CABA9C" }}>
            Quick Links
          </h4>
          <ul className="space-y-1 opacity-90">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Shop</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2" style={{ color: "#CABA9C" }}>
            Contact
          </h4>
          <p className="opacity-90">Email: glody@handcraftedhaven.com</p>
          <p className="opacity-90">Phone: +243 --- --- ----</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="text-center text-xs py-4 border-t"
        style={{ borderColor: "#4C6444", color: "#CABA9C" }}
      >
        © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
      </div>
    </footer>
  );
}
