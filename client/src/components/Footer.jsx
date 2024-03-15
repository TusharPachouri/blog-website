import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import background from "../assets/img/backgroundImage.jpg";
// import background from "../assets/img/backgroundImage.jpg";

const sections = [
  {
    title: "Solutions",
    items: ["Marketing", "Analytics", "Commerce", "Data", "Cloud"],
  },
  {
    title: "Support",
    items: ["Pricing", "Documentation", "Guides", "API Status"],
  },
  {
    title: "Company",
    items: ["About", "Blog", "Jobs", "Press", "Partners"],
  },
  {
    title: "Legal",
    items: ["Claims", "Privacy", "Terms", "Policies", "Conditions"],
  },
  {
    title: "About",
    items: [
      "This is a social media platform where you can share your thoughts, ideas, and experiences with others.",
    ],
  },
  {
    title: "Contact",
    items: ["Email: tusharpachouri001@gmail.com", "Phone: (123) 456-7890"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
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
          <p className="py-1">2022 Workflow, LLC. All rights reserved</p>
          <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
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
