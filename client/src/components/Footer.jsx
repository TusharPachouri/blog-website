import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import background from "../assets/img/backgroundImage.jpg";

const sections = [
  {
    title: "Categories",
    items: ["Technology", "Travel", "Food", "Lifestyle", "Entertainment"],
  },
  {
    title: "Resources",
    items: ["Write for Us", "Become a Contributor", "Advertise with Us"],
  },
  {
    title: "Contact",
    items: ["Email: tusharpachouri@gmail.com", "Phone: 82 18 504 473"],
  },
  {
    title: "Legal",
    items: ["Privacy Policy", "Terms of Service", "Disclaimer"],
  },
  {
    title: "About",
    items: [
      "This is a blog platform where you can share your thoughts, stories, and experiences with the world.",
    ],
  },
  {
    title: "Company",
    items: ["About Us", "Our Team", "Contact Us"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <footer
      className="w-full bg-slate-900 text-gray-300 py-4 mt-auto "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-[1240px] mx-auto py-1">
        <hr className="border-color: rgb(99 102 241) my-8" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h6 className="font-bold uppercase pt-1">{section.title}</h6>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i} className="py-1 text-gray-500 hover:text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-color: rgb(99 102 241) my-5" />
        <div className="flex flex-col w-full mx-auto justify-between sm:flex-row text-center text-gray-500">
          <p className="py-1">2024 Blog Website. All rights reserved</p>
          <div className="flex justify-between sm:w-[200px] pt-2 text-2xl">
            {items.map((x, index) => (
              <a
                key={index}
                href={x.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <x.icon className="hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
