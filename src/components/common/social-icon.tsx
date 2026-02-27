import { Image } from "@mantine/core";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import phone from "../../assets/contact.svg";
import email from "../../assets/email.svg";
import location from "../../assets/location.svg";

import { IconBrandFacebook, IconSend } from "@tabler/icons-react";

export function MemberSocialIcon({ platform }: { platform: string }) {
  if (platform === "facebook") 
    return <Image w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} fit="contain" src={facebook} />;
  
  if (platform === "instagram") 
    return <Image w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} fit="contain" src={instagram} />;
  
  if (platform === "twitter") 
    return <Image w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} fit="contain" src={twitter} />;
    
  return <IconBrandFacebook size={20} />;
}

export function ContactIcon({ type }: { type?: string }) {
  if (type === "phone") 
    return <Image src={phone} w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} fit="contain" color="#96BB7C" />;
    
  if (type === "address") 
    return <Image src={location} w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} fit="contain" color="#96BB7C" />;
    
  if (type === "email") 
    return <Image src={email} w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} fit="contain" color="#96BB7C" />;
    
  return <IconSend size={24} color="#96BB7C" />;
}
