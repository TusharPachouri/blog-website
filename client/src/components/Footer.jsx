import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/aboutus" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const socialItems = [
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://www.facebook.com/",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/",
    color: "hover:text-pink-400",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    link: "https://twitter.com/",
    color: "hover:text-sky-400",
  },
  {
    name: "Github",
    icon: FaGithub,
    link: "https://github.com/",
    color: "hover:text-gray-300",
  },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900 text-white mt-auto overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                NebulaBlogs
              </h3>
              <p className="text-sm text-white/60">Where stories come alive</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-105 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm font-medium">
              Follow us:
            </span>
            <div className="flex gap-3">
              {socialItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-white/60 transition-all duration-300 hover:scale-110 hover:bg-white/10 ${item.color} hover:border-white/20 hover:shadow-lg`}
                >
                  <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © 2024 NebulaBlogs. All rights reserved.
            </p>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-sm text-white/60">
              <span>tusharpachouri@gmail.com</span>
              <span>+91 82185 04473</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </footer>
  );
};

export default Footer;
