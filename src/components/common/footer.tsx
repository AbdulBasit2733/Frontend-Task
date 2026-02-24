import { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Title,
  Text,
  Group,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Stack,
  Tooltip,
  Image,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconEdit,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useSiteData } from "../../context/site-data-context";
import type {
  FooterBottom,
  FooterColumn,
  FooterLink,
  FooterSocialLink,
} from "../../types/types";

// ── Platform → icon ───────────────────────────────────
function SocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <IconBrandInstagram size={20} />;
  if (platform === "twitter") return <IconBrandTwitter size={20} />;
  if (platform === "youtube") return <IconBrandYoutube size={20} />;
  return <IconBrandFacebook size={20} />;
}

// ── Defaults ──────────────────────────────────────────
const emptyCol: FooterColumn = { header: "", links: [] };
const emptyLink: FooterLink = { title: "", href: "", icon: "", type: "" };
const emptySocial: FooterSocialLink = { platform: "", href: "" };

// ── Link sub-modal mode ───────────────────────────────
type LinkSubMode =
  | { type: "editLink"; index: number }
  | { type: "addLink" }
  | null;

// ── Social modal mode ─────────────────────────────────
type SocialMode =
  | { type: "editSocial"; platform: string }
  | { type: "addSocial" }
  | null;

export default function Footer() {
  const {
    data,
    isEditMode,
    addFooterColumn,
    removeFooterColumn,
    updateFooterColumn,
    updateFooterBottom,
    updateFooterSocialLink,
    addFooterSocialLink,
    removeFooterSocialLink,
  } = useSiteData();

  const footerColumns = data.footerSectionContent;
  const footerBottom = data.footerBottomContent;

  // ════════════════════════════════════════════════════
  // 1. COLUMN MODAL — header + staged links
  // ════════════════════════════════════════════════════
  const [colOpened, { open: openColModal, close: closeColModal }] =
    useDisclosure(false);
  const [colEditingHeader, setColEditingHeader] = useState<string | null>(null); // null = add
  const [colForm, setColForm] = useState<FooterColumn>({ ...emptyCol });

  // ── Link sub-modal (lives inside column modal) ───────
  const [linkSubMode, setLinkSubMode] = useState<LinkSubMode>(null);
  const [linkSubOpened, { open: openLinkSub, close: closeLinkSub }] =
    useDisclosure(false);
  const [linkForm, setLinkForm] = useState<FooterLink>({ ...emptyLink });

  const openEditCol = (col: FooterColumn) => {
    setColForm({ ...col, links: col.links.map((l) => ({ ...l })) });
    setColEditingHeader(col.header);
    openColModal();
  };

  const openAddCol = () => {
    setColForm({ ...emptyCol });
    setColEditingHeader(null);
    openColModal();
  };

  // ── Save entire column (header + all staged links) in ONE call ──
  const handleColSave = () => {
    if (colEditingHeader !== null) {
      // ✅ single updateFooterColumn — commits header + full links array
      updateFooterColumn(colEditingHeader, {
        header: colForm.header,
        isContact: colForm.isContact,
        links: colForm.links,
      });
    } else {
      // ✅ single addFooterColumn — commits header + all staged links
      addFooterColumn({
        header: colForm.header,
        isContact: colForm.isContact ?? false,
        links: colForm.links,
      });
    }
    closeColModal();
    setColEditingHeader(null);
  };

  // ── Sub-modal: open edit link ─────────────────────────
  const openEditLink = (link: FooterLink, index: number) => {
    setLinkForm({ ...link });
    setLinkSubMode({ type: "editLink", index });
    openLinkSub();
  };

  // ── Sub-modal: open add link ──────────────────────────
  const openAddLink = () => {
    setLinkForm({ ...emptyLink });
    setLinkSubMode({ type: "addLink" });
    openLinkSub();
  };

  // ── Sub-modal save — updates colForm.links locally only ──
  const handleLinkSubSave = () => {
    if (linkSubMode?.type === "editLink") {
      setColForm((p) => ({
        ...p,
        links: p.links.map((l, i) =>
          i === linkSubMode.index ? { ...linkForm } : l,
        ),
      }));
    } else if (linkSubMode?.type === "addLink") {
      setColForm((p) => ({
        ...p,
        links: [...p.links, { ...linkForm }],
      }));
    }
    closeLinkSub();
    setLinkSubMode(null);
  };

  // ── Remove link from staged colForm only ─────────────
  const handleRemoveStagedLink = (index: number) => {
    setColForm((p) => ({
      ...p,
      links: p.links.filter((_, i) => i !== index),
    }));
  };

  // ════════════════════════════════════════════════════
  // 2. COPYRIGHT MODAL
  // ════════════════════════════════════════════════════
  const [bottomOpened, { open: openBottomModal, close: closeBottomModal }] =
    useDisclosure(false);
  const [bottomForm, setBottomForm] = useState<FooterBottom>({
    ...footerBottom,
    socialLinks: [...footerBottom.socialLinks],
  });

  const openEditBottom = () => {
    setBottomForm({
      copyright: data.footerBottomContent.copyright,
      socialLinks: [...data.footerBottomContent.socialLinks],
    });
    openBottomModal();
  };

  const handleBottomSave = () => {
    updateFooterBottom({ copyright: bottomForm.copyright });
    closeBottomModal();
  };

  // ════════════════════════════════════════════════════
  // 3. SOCIAL LINK MODAL
  // ════════════════════════════════════════════════════
  const [socialMode, setSocialMode] = useState<SocialMode>(null);
  const [socialOpened, { open: openSocialModal, close: closeSocialModal }] =
    useDisclosure(false);
  const [socialForm, setSocialForm] = useState<FooterSocialLink>({
    ...emptySocial,
  });

  const openEditSocial = (link: FooterSocialLink) => {
    setSocialForm({ ...link });
    setSocialMode({ type: "editSocial", platform: link.platform });
    openSocialModal();
  };

  const openAddSocial = () => {
    setSocialForm({ ...emptySocial });
    setSocialMode({ type: "addSocial" });
    openSocialModal();
  };

  const handleSocialSave = () => {
    if (socialMode?.type === "editSocial") {
      updateFooterSocialLink(socialMode.platform, { href: socialForm.href });
    } else {
      addFooterSocialLink(socialForm);
    }
    closeSocialModal();
    setSocialMode(null);
  };

  return (
    <Box>
      {/* ══ DIV 1 — Columns ══════════════════════════════ */}
      <Box bg="white">
        <Container size="lg" pt={50} pb={50}>
          <SimpleGrid cols={{ base: 1, sm: 3, md: 5 }} spacing={0}>
            {footerColumns.map((col) => (
              <Box key={col.header}>
                {/* Column header row */}
                <Group justify="space-between" align="center" mb="md">
                  <Title order={6} c="dark" fw={700} fz={16}>
                    {col.header}
                  </Title>
                  {isEditMode && (
                    <Group gap={4}>
                      <Tooltip label="Edit Column" withArrow>
                        <ActionIcon
                          variant="light"
                          color="blue"
                          radius="xl"
                          size="xs"
                          onClick={() => openEditCol(col)}
                        >
                          <IconEdit size={10} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Remove Column" withArrow>
                        <ActionIcon
                          variant="light"
                          color="red"
                          radius="xl"
                          size="xs"
                          onClick={() => removeFooterColumn(col.header)}
                        >
                          <IconTrash size={10} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  )}
                </Group>

                {/* Links */}
                {col.links.map((link, index) =>
                  col.isContact ? (
                    <Group
                      key={index}
                      gap={8}
                      mb="xs"
                      align={link.type === "address" ? "flex-start" : "center"}
                      wrap="nowrap"
                    >
                      {link.icon && (
                        <ActionIcon variant="white" style={{ flexShrink: 0 }}>
                          <Image
                            src={link.icon}
                            alt={link.type}
                            w={16}
                            h={16}
                            style={{ objectFit: "contain" }}
                          />
                        </ActionIcon>
                      )}
                      <Text
                        component="a"
                        href={link.href}
                        c="gray"
                        fz={12}
                        fw={700}
                        lh={1.5}
                        style={{ textDecoration: "none", flex: 1 }}
                      >
                        {link.title}
                      </Text>
                    </Group>
                  ) : (
                    <Text
                      key={index}
                      component="a"
                      href={link.href}
                      c="gray"
                      fz={14}
                      fw={700}
                      mb={6}
                      display="block"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      {link.title}
                    </Text>
                  ),
                )}
              </Box>
            ))}
          </SimpleGrid>

          {isEditMode && (
            <Group mt="xl">
              <Button
                variant="light"
                color="green"
                size="xs"
                leftSection={<IconPlus size={14} />}
                onClick={openAddCol}
              >
                Add Column
              </Button>
            </Group>
          )}
        </Container>
      </Box>

      {/* ══ DIV 2 — Bottom bar ═══════════════════════════ */}
      <Box bg="#FAFAFA" py={25}>
        <Container size="lg">
          <Group justify="space-between">
            <Group gap="xs" align="center">
              <Text c="gray" fz={14} fw={700}>
                {footerBottom.copyright}
              </Text>
              {isEditMode && (
                <Tooltip label="Edit Copyright" withArrow>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    radius="xl"
                    size="xs"
                    onClick={openEditBottom}
                  >
                    <IconEdit size={10} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>

            <Group gap="xs">
              {footerBottom.socialLinks.map((link) => (
                <Group key={link.platform} gap={2} align="center">
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon platform={link.platform} />
                  </ActionIcon>
                  {isEditMode && (
                    <Group gap={2}>
                      <Tooltip label={`Edit ${link.platform}`} withArrow>
                        <ActionIcon
                          variant="light"
                          color="blue"
                          radius="xl"
                          size="xs"
                          onClick={() => openEditSocial(link)}
                        >
                          <IconEdit size={10} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Remove" withArrow>
                        <ActionIcon
                          variant="light"
                          color="red"
                          radius="xl"
                          size="xs"
                          onClick={() => removeFooterSocialLink(link.platform)}
                        >
                          <IconTrash size={10} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  )}
                </Group>
              ))}
              {isEditMode && (
                <Tooltip label="Add Social Link" withArrow>
                  <ActionIcon
                    variant="light"
                    color="green"
                    radius="xl"
                    size="xs"
                    onClick={openAddSocial}
                  >
                    <IconPlus size={10} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </Group>
        </Container>
      </Box>

      {/* ══ MODAL 1 — Column (header + staged link list) ═ */}
      <Modal
        opened={colOpened}
        onClose={() => {
          closeColModal();
          setColEditingHeader(null);
        }}
        title={colEditingHeader !== null ? "Edit Column" : "Add Column"}
        centered
        size="md"
      >
        <Stack gap="sm">
          <TextInput
            label="Column Header"
            placeholder="Company Info"
            value={colForm.header}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setColForm((p) => ({ ...p, header: value }));
            }}
          />

          {/* ── Staged links list ── */}
          <Divider label="Links" labelPosition="left" />

          <Stack gap={6}>
            {colForm.links.map((link, index) => (
              <Group
                key={index}
                gap={8}
                align="center"
                justify="space-between"
                p={8}
                style={{ border: "1px solid #E8E8E8", borderRadius: 8 }}
              >
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text fz={12} fw={600} c="dark" truncate>
                    {link.title || "—"}
                  </Text>
                  <Text fz={11} c="gray" truncate>
                    {link.href || "no url"}
                  </Text>
                  {/* Show type badge for contact columns */}
                  {colForm.isContact && link.type && (
                    <Text fz={10} c="green">
                      {link.type}
                    </Text>
                  )}
                </Box>
                <Group gap={4}>
                  <Tooltip label="Edit" withArrow>
                    <ActionIcon
                      variant="light"
                      color="blue"
                      radius="xl"
                      size="xs"
                      onClick={() => openEditLink(link, index)}
                    >
                      <IconEdit size={10} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Remove" withArrow>
                    <ActionIcon
                      variant="light"
                      color="red"
                      radius="xl"
                      size="xs"
                      onClick={() => handleRemoveStagedLink(index)}
                    >
                      <IconTrash size={10} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            ))}

            <Button
              variant="light"
              color="green"
              size="xs"
              leftSection={<IconPlus size={12} />}
              onClick={openAddLink}
              style={{ alignSelf: "flex-start" }}
            >
              Add Link
            </Button>
          </Stack>

          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => {
                closeColModal();
                setColEditingHeader(null);
              }}
            >
              Cancel
            </Button>
            {/* ✅ ONE save — commits header + entire links array */}
            <Button
              color="green"
              onClick={handleColSave}
              disabled={!colForm.header.trim()}
            >
              {colEditingHeader !== null ? "Save Changes" : "Add Column"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ══ MODAL 1a — Link sub-modal (z-index above column modal) ══ */}
      <Modal
        opened={linkSubOpened}
        onClose={() => {
          closeLinkSub();
          setLinkSubMode(null);
        }}
        title={linkSubMode?.type === "editLink" ? "Edit Link" : "Add Link"}
        centered
        size="sm"
        zIndex={400}
      >
        <Stack gap="sm">
          <TextInput
            label="Display Text"
            placeholder="About Us"
            value={linkForm.title}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setLinkForm((p) => ({ ...p, title: value }));
            }}
          />
          <TextInput
            label="URL"
            placeholder="#  |  tel:+1...  |  mailto:..."
            value={linkForm.href}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setLinkForm((p) => ({ ...p, href: value }));
            }}
          />

          {/* Extra fields shown only for contact columns */}
          {colForm.isContact && (
            <>
              <Divider label="Contact extras" labelPosition="left" />
              <TextInput
                label="Type"
                placeholder="phone | address | email"
                value={linkForm.type ?? ""}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setLinkForm((p) => ({ ...p, type: value }));
                }}
              />
              <TextInput
                label="Icon URL or Path"
                placeholder="/assets/contact.svg"
                value={linkForm.icon ?? ""}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setLinkForm((p) => ({ ...p, icon: value }));
                }}
              />
              {linkForm.icon && (
                <Group gap={8} align="center">
                  <Text fz="xs" c="gray">
                    Preview:
                  </Text>
                  <Image
                    src={linkForm.icon}
                    alt="icon preview"
                    w={24}
                    h={24}
                    style={{ objectFit: "contain" }}
                  />
                </Group>
              )}
            </>
          )}

          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => {
                closeLinkSub();
                setLinkSubMode(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleLinkSubSave}
              disabled={!linkForm.title.trim()}
            >
              {linkSubMode?.type === "editLink" ? "Save" : "Add Link"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ══ MODAL 2 — Copyright ═══════════════════════════ */}
      <Modal
        opened={bottomOpened}
        onClose={closeBottomModal}
        title="Edit Copyright"
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Copyright Text"
            placeholder="Made With Love By..."
            value={bottomForm.copyright}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setBottomForm((p) => ({ ...p, copyright: value }));
            }}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeBottomModal}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleBottomSave}
              disabled={!bottomForm.copyright.trim()}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ══ MODAL 3 — Social link ═════════════════════════ */}
      <Modal
        opened={socialOpened}
        onClose={() => {
          closeSocialModal();
          setSocialMode(null);
        }}
        title={
          socialMode?.type === "editSocial"
            ? "Edit Social Link"
            : "Add Social Link"
        }
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Platform"
            placeholder="facebook | instagram | twitter | youtube"
            value={socialForm.platform}
            disabled={socialMode?.type === "editSocial"}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSocialForm((p) => ({ ...p, platform: value }));
            }}
          />
          <TextInput
            label="URL"
            placeholder="https://facebook.com/yourpage"
            value={socialForm.href}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSocialForm((p) => ({ ...p, href: value }));
            }}
          />
          <Group gap={8} align="center">
            <Text fz="xs" c="gray">
              Preview:
            </Text>
            <ActionIcon variant="subtle" color="green">
              <SocialIcon platform={socialForm.platform} />
            </ActionIcon>
          </Group>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => {
                closeSocialModal();
                setSocialMode(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleSocialSave}
              disabled={!socialForm.platform.trim() || !socialForm.href.trim()}
            >
              {socialMode?.type === "editSocial" ? "Save Changes" : "Add Link"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
