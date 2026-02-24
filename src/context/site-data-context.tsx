import { createContext, useContext, useState, type ReactNode } from "react";

import type {
  FooterBottom,
  FooterColumn,
  FooterSocialLink,
  HeroContent,
  NavbarContent,
  NavLink,
  NewsletterContent,
  PackageContent,
  PackageItem,
  SiteDataContextType,
  SiteDataState,
  TeamContent,
  TeamMember,
} from "../types/types";
import { defaultData } from "../data/siteData";

// ─── Context ──────────────────────────────────────────────
const SiteDataContext = createContext<SiteDataContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────
export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteDataState>(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => setIsEditMode((p) => !p);
  const updateNavbarContent = (updated: Partial<NavbarContent>) =>
    setData((p) => ({
      ...p,
      navbarSectionContent: { ...p.navbarSectionContent, ...updated },
    }));

  // ── Hero ──────────────────────────────────────────────
  const updateHeroContent = (updated: Partial<HeroContent>) =>
    setData((p) => ({
      ...p,
      heroSectionContent: { ...p.heroSectionContent, ...updated },
    }));

  // ── Navbar ────────────────────────────────────────────
  const addNavLink = (link: NavLink) =>
    setData((p) => ({
      ...p,
      navbarSectionContent: {
        ...p.navbarSectionContent,
        navLinks: [...p.navbarSectionContent.navLinks, link],
      },
    }));

  const removeNavLink = (label: string) =>
    setData((p) => ({
      ...p,
      navbarSectionContent: {
        ...p.navbarSectionContent,
        navLinks: p.navbarSectionContent.navLinks.filter(
          (l) => l.label !== label,
        ),
      },
    }));

  const updateNavLink = (label: string, updated: Partial<NavLink>) =>
    setData((p) => ({
      ...p,
      navbarSectionContent: {
        ...p.navbarSectionContent,
        navLinks: p.navbarSectionContent.navLinks.map((l) =>
          l.label === label ? { ...l, ...updated } : l,
        ),
      },
    }));

  // ── Packages ──────────────────────────────────────────
  const addPackage = (pkg: PackageItem) =>
    setData((p) => ({
      ...p,
      packageSectionContent: {
        ...p.packageSectionContent,
        packages: [...p.packageSectionContent.packages, pkg],
      },
    }));

  const removePackage = (id: number) =>
    setData((p) => ({
      ...p,
      packageSectionContent: {
        ...p.packageSectionContent,
        packages: p.packageSectionContent.packages.filter((x) => x.id !== id),
      },
    }));

  const updatePackage = (id: number, updated: Partial<PackageItem>) =>
    setData((p) => ({
      ...p,
      packageSectionContent: {
        ...p.packageSectionContent,
        packages: p.packageSectionContent.packages.map((x) =>
          x.id === id ? { ...x, ...updated } : x,
        ),
      },
    }));
  const updatePackageSection = (
    updated: Partial<
      Pick<PackageContent, "title" | "description" | "anchorContent">
    >,
  ) =>
    setData((p) => ({
      ...p,
      packageSectionContent: { ...p.packageSectionContent, ...updated },
    }));

  // ── Team ──────────────────────────────────────────────
  const addTeamMember = (member: TeamMember) =>
    setData((p) => ({
      ...p,
      teamSectionContent: {
        ...p.teamSectionContent,
        teamMembers: [...p.teamSectionContent.teamMembers, member],
      },
    }));

  const removeTeamMember = (id: number) =>
    setData((p) => ({
      ...p,
      teamSectionContent: {
        ...p.teamSectionContent,
        teamMembers: p.teamSectionContent.teamMembers.filter(
          (m) => m.id !== id,
        ),
      },
    }));

  const updateTeamMember = (id: number, updated: Partial<TeamMember>) =>
    setData((p) => ({
      ...p,
      teamSectionContent: {
        ...p.teamSectionContent,
        teamMembers: p.teamSectionContent.teamMembers.map((m) =>
          m.id === id ? { ...m, ...updated } : m,
        ),
      },
    }));

  const updateTeamSection = (
    updated: Partial<Pick<TeamContent, "label" | "title" | "description">>,
  ) =>
    setData((p) => ({
      ...p,
      teamSectionContent: { ...p.teamSectionContent, ...updated },
    }));

  // ── Newsletter ────────────────────────────────────────
  const updateNewsletterContent = (updated: Partial<NewsletterContent>) =>
    setData((p) => ({
      ...p,
      newsletterSectionContent: { ...p.newsletterSectionContent, ...updated },
    }));

  // ── Footer columns ────────────────────────────────────
  const addFooterColumn = (col: FooterColumn) =>
    setData((p) => ({
      ...p,
      footerSectionContent: [...p.footerSectionContent, col],
    }));

  const updateFooterColumn = (
    originalHeader: string,
    updated: Partial<FooterColumn>,
  ) =>
    setData((p) => ({
      ...p,
      footerSectionContent: p.footerSectionContent.map((c) =>
        c.header === originalHeader ? { ...c, ...updated } : c,
      ),
    }));

  const removeFooterColumn = (header: string) =>
    setData((p) => ({
      ...p,
      footerSectionContent: p.footerSectionContent.filter(
        (c) => c.header !== header,
      ),
    }));

  // ── Footer bottom ─────────────────────────────────────
  const updateFooterBottom = (updated: Partial<FooterBottom>) =>
    setData((p) => ({
      ...p,
      footerBottomContent: { ...p.footerBottomContent, ...updated }, // ✅ correct key
    }));

  const updateFooterSocialLink = (
    platform: string,
    updated: Partial<FooterSocialLink>,
  ) =>
    setData((p) => ({
      ...p,
      footerBottomContent: {
        ...p.footerBottomContent,
        socialLinks: p.footerBottomContent.socialLinks.map(
          (
            s, // ✅ correct key
          ) => (s.platform === platform ? { ...s, ...updated } : s),
        ),
      },
    }));

  const addFooterSocialLink = (link: FooterSocialLink) =>
    setData((p) => ({
      ...p,
      footerBottomContent: {
        ...p.footerBottomContent,
        socialLinks: [...p.footerBottomContent.socialLinks, link], // ✅ correct key
      },
    }));

  const removeFooterSocialLink = (platform: string) =>
    setData((p) => ({
      ...p,
      footerBottomContent: {
        ...p.footerBottomContent,
        socialLinks: p.footerBottomContent.socialLinks.filter(
          // ✅ correct key
          (s) => s.platform !== platform,
        ),
      },
    }));

  return (
    <SiteDataContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        data,
        updateNavbarContent,
        updateHeroContent,
        addNavLink,
        removeNavLink,
        updateNavLink,
        addPackage,
        removePackage,
        updatePackage,
        updatePackageSection,
        addTeamMember,
        removeTeamMember,
        updateTeamMember,
        updateTeamSection,
        updateNewsletterContent,
        addFooterColumn,
        updateFooterColumn,
        removeFooterColumn,
        updateFooterBottom,
        updateFooterSocialLink,
        addFooterSocialLink,
        removeFooterSocialLink,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────
export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used inside SiteDataProvider");
  return ctx;
}
