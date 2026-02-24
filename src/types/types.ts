export type NavLink = { label: string; href: string };

export type NavbarContent = {
  brandName: string;
  navLinks: NavLink[];
  primaryButton: { label: string; href: string; icon?: string };
  secondaryButton: { label: string; href: string; icon?: string };
};

export type HeroContent = {
  label: string;
  title: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  image: string;
};
export type PackageItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type PackageContent = {
  title: string;
  description: string;
  anchorContent: { label: string; href: string };
  packages: PackageItem[];
};

export type TeamMember = {
  id: number;
  name: string;
  profession: string;
  image: string;
};

export type TeamContent = {
  label: string;
  title: string;
  description: string;
  teamMembers: TeamMember[];
};


export type FooterLink = {
  title: string;
  href: string;
  icon?: string;
  type?: string;
};

export type FooterColumn = {
  header: string;
  links: FooterLink[];
  isContact?: boolean;
};

export type FooterSocialLink = {
  platform: string;
  href: string;
};

export type FooterBottom = {
  copyright: string;
  socialLinks: FooterSocialLink[];
};

export type NewsletterContent = {
  label: string;
  title: string;
  description: string;
  placeholder: string;
  btnText: string;
};

export type SiteDataState = {
  navbarSectionContent: NavbarContent;
  heroSectionContent: HeroContent;
  packageSectionContent: PackageContent;
  teamSectionContent: TeamContent;
  newsletterSectionContent: NewsletterContent;
  footerSectionContent: FooterColumn[];
  footerBottomContent: FooterBottom;
};

export type SiteDataContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  data: SiteDataState;

  // Hero
  updateHeroContent: (updated: Partial<HeroContent>) => void;

  // Navbar
  addNavLink: (link: NavLink) => void;
  removeNavLink: (label: string) => void;
  updateNavLink: (label: string, updated: Partial<NavLink>) => void;
  updateNavbarContent: (
    updated: Partial<Omit<NavbarContent, "navLinks">>,
  ) => void;

  // Packages
  addPackage: (pkg: PackageItem) => void;
  removePackage: (id: number) => void;
  updatePackage: (id: number, updated: Partial<PackageItem>) => void;
  updatePackageSection: (
    updated: Partial<
      Pick<PackageContent, "title" | "description" | "anchorContent">
    >,
  ) => void;

  // Team
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (id: number) => void;
  updateTeamMember: (id: number, updated: Partial<TeamMember>) => void;
  updateTeamSection: (
    updated: Partial<Pick<TeamContent, "label" | "title" | "description">>,
  ) => void;

  // Newsletter
  updateNewsletterContent: (updated: Partial<NewsletterContent>) => void;

  // Footer columns (contact is just a column)
  addFooterColumn: (col: FooterColumn) => void;
  updateFooterColumn: (
    originalHeader: string,
    updated: Partial<FooterColumn>,
  ) => void;
  removeFooterColumn: (header: string) => void;
  // Footer bottom bar
  updateFooterBottom: (updated: Partial<FooterBottom>) => void;
  updateFooterSocialLink: (platform: string, updated: Partial<FooterSocialLink>) => void;
  addFooterSocialLink: (link: FooterSocialLink) => void;
  removeFooterSocialLink: (platform: string) => void;
};
