import computerImage from "../assets/012-blackboards.svg";
import teleScopeImage from "../assets/013-telescope-1.svg";
import userCoverImage1 from "../assets/user-cover-1.png";
import userCoverImage2 from "../assets/user-cover-2.png";
import userCoverImage3 from "../assets/user-cover-3.png";
import userCoverImage4 from "../assets/user-cover-4.png";
import heroImage from "../assets/hero-cover-1.png";
import phoneIcon from "../assets/contact.svg";
import locationIcon from "../assets/location.svg";
import emailIcon from "../assets/email.svg";
import type { SiteDataState } from "../types/types";

export const defaultData: SiteDataState = {
  navbarSectionContent: {
    brandName: "Brandname",
    navLinks: [
      { label: "Home", href: "#" },
      { label: "Product", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
    primaryButton: { label: "Login", href: "#" },
    secondaryButton: { label: "JOIN US", href: "#" },
  },

  heroSectionContent: {
    label: "Welcome",
    title: "Best Learning\nOpportunities",
    description: "Our goal is to make online education work for everyone",
    primaryBtn: "Join Us",
    secondaryBtn: "Learn More",
    image: heroImage,
  },

  packageSectionContent: {
    title: "Affordable Packages",
    description:
      "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics",
    anchorContent: { label: "Learn More", href: "#" },
    packages: [
      { id: 1, icon: computerImage, title: "Certified Teacher", description: "The gradual accumulation of information about." },
      { id: 2, icon: teleScopeImage, title: "Expert Instruction", description: "The gradual accumulation of information about." },
    ],
  },

  teamSectionContent: {
    label: "Team",
    title: "Get Quality Education",
    description:
      "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics",
    teamMembers: [
      { id: 1, name: "Julian Jameson", profession: "Profession", image: userCoverImage1 },
      { id: 2, name: "Julian Jameson", profession: "Profession", image: userCoverImage2 },
      { id: 3, name: "Julian Jameson", profession: "Profession", image: userCoverImage3 },
      { id: 4, name: "Julian Jameson", profession: "Profession", image: userCoverImage4 },
    ],
  },

  newsletterSectionContent: {
    label: "Newsletter",
    title: "Watch our Courses",
    description:
      "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics",
    placeholder: "Your Email",
    btnText: "Subscribe",
  },

  footerSectionContent: [
    {
      header: "Company Info",
      links: [
        { title: "About Us", href: "#" },
        { title: "Carrier", href: "#" },
        { title: "We are hiring", href: "#" },
        { title: "Blog", href: "#" },
      ],
    },
    {
      header: "Legal",
      links: [
        { title: "About Us", href: "#" },
        { title: "Carrier", href: "#" },
        { title: "We are hiring", href: "#" },
        { title: "Blog", href: "#" },
      ],
    },
    {
      header: "Features",
      links: [
        { title: "Business Marketing", href: "#" },
        { title: "User Analytic", href: "#" },
        { title: "Live Chat", href: "#" },
        { title: "Unlimited Support", href: "#" },
      ],
    },
    {
      header: "Resources",
      links: [
        { title: "iOS & Android", href: "#" },
        { title: "Watch a Demo", href: "#" },
        { title: "Customers", href: "#" },
        { title: "API", href: "#" },
      ],
    },
    {
      header: "Get In Touch",
      isContact: true,
      links: [
        { title: "(480) 555-0103", href: "tel:+14805550103", icon: phoneIcon, type: "phone" },
        { title: "4517 Washington Ave. Manchester, Kentucky 39495", href: "#", icon: locationIcon, type: "address" },
        { title: "debra.holt@example.com", href: "mailto:debra.holt@example.com", icon: emailIcon, type: "email" },
      ],
    },
  ],

  // ✅ consistent key name
  footerBottomContent: {
    copyright: "Made With Love By Figmaland All Right Reserved",
    socialLinks: [
      { platform: "facebook", href: "#" },
      { platform: "instagram", href: "#" },
      { platform: "twitter", href: "#" },
    ],
  },
};
