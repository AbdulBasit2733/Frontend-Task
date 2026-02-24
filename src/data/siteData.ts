import computerImage from "../assets/012-blackboards.svg";
import teleScopeImage from "../assets/013-telescope-1.svg";
import userCoverImage1 from "../assets/user-cover-1.png";
import userCoverImage2 from "../assets/user-cover-2.png";
import userCoverImage3 from "../assets/user-cover-3.png";
import userCoverImage4 from "../assets/user-cover-4.png";

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#contact" },
];

export const packages = [
  {
    id: 1,
    icon: computerImage,
    title: "Certified Teacher",
    description: "The gradual accumulation of information about.",
  },
  {
    id: 2,
    icon: teleScopeImage,
    title: "Expert Instruction",
    description: "The gradual accumulation of information about.",
  },
];

export const teamMembers = [
  { id: 1, name: "Julian Jameson", profession: "Profession", image: userCoverImage1 },
  { id: 2, name: "Julian Jameson", profession: "Profession", image: userCoverImage2 },
  { id: 3, name: "Julian Jameson", profession: "Profession", image: userCoverImage3 },
  { id: 4, name: "Julian Jameson", profession: "Profession", image: userCoverImage4 },
];

export const footerColumns = [
  { title: "Company Info", links: ["About Us", "Carrier", "We are hiring", "Blog"] },
  { title: "Legal",        links: ["About Us", "Carrier", "We are hiring", "Blog"] },
  { title: "Features",     links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"] },
  { title: "Resources",    links: ["iOS & Android", "Watch a Demo", "Customers", "API"] },
];
