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
  Textarea,
  Button,
  Stack,
  Tooltip,
  Image,
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

// ── Platform → Tabler icon ────────────────────────────
function SocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <IconBrandInstagram size={20} />;
  if (platform === "twitter") return <IconBrandTwitter size={20} />;
  if (platform === "youtube") return <IconBrandYoutube size={20} />;
  return <IconBrandFacebook size={20} />;
}

// ── Empty defaults ────────────────────────────────────
const emptyCol: FooterColumn = { header: "", links: [] };
const emptyLink: FooterLink = { title: "", href: "", icon: "", type: "" };

type ModalMode =
  | { type: "editColumn"; originalHeader: string }
  | { type: "addColumn" }
  | { type: "editLink"; colHeader: string; linkIndex: number }
  | { type: "addLink"; colHeader: string }
  | { type: "editBottom" }
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
  const footerBottom = data.footerBottomContent; // ✅ correct key

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const [colForm, setColForm] = useState<FooterColumn>(() => ({ ...emptyCol }));
  const [linksInput, setLinksInput] = useState("");

  const [linkForm, setLinkForm] = useState<FooterLink>(() => ({
    ...emptyLink,
  }));

  const [bottomForm, setBottomForm] = useState<FooterBottom>(() => ({
    ...data.footerBottomContent,
    socialLinks: [...data.footerBottomContent.socialLinks],
  }));
  const [socialForm, setSocialForm] = useState<FooterSocialLink>(() => ({
    platform: "",
    href: "",
  }));

  const openEditCol = (col: FooterColumn) => {
    setColForm({ ...col, links: [...col.links] });
    if (!col.isContact) {
      setLinksInput(col.links.map((l) => l.title).join("\n"));
    }
    setModalMode({ type: "editColumn", originalHeader: col.header });
    open();
  };

  const openAddCol = () => {
    setColForm({ ...emptyCol });
    setLinksInput("");
    setModalMode({ type: "addColumn" });
    open();
  };

  const openEditLink = (colHeader: string, link: FooterLink, index: number) => {
    setLinkForm({ ...link });
    setModalMode({ type: "editLink", colHeader, linkIndex: index });
    open();
  };

  const openAddLink = (colHeader: string) => {
    setLinkForm({ ...emptyLink });
    setModalMode({ type: "addLink", colHeader });
    open();
  };

  const openEditBottom = () => {
    setBottomForm({
      copyright: data.footerBottomContent.copyright,
      socialLinks: [...data.footerBottomContent.socialLinks],
    });
    setModalMode({ type: "editBottom" });
    open();
  };

  const openEditSocial = (link: FooterSocialLink) => {
    setSocialForm({ ...link });
    setModalMode({ type: "editSocial", platform: link.platform });
    open();
  };

  const openAddSocial = () => {
    setSocialForm({ platform: "", href: "" });
    setModalMode({ type: "addSocial" });
    open();
  };

  const handleClose = () => {
    close();
    setModalMode(null);
  };

  const handleSave = () => {
    if (modalMode?.type === "editColumn") {
      updateFooterColumn(modalMode.originalHeader, {
        header: colForm.header,
        isContact: colForm.isContact,
        links: colForm.isContact
          ? colForm.links
          : linksInput
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean)
              .map((t) => ({ title: t, href: "#" })),
      });
    } else if (modalMode?.type === "addColumn") {
      addFooterColumn({
        header: colForm.header,
        isContact: false,
        links: linksInput
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .map((t) => ({ title: t, href: "#" })),
      });
    } else if (modalMode?.type === "editLink") {
      const col = footerColumns.find((c) => c.header === modalMode.colHeader);
      if (!col) return;
      updateFooterColumn(modalMode.colHeader, {
        links: col.links.map((l, i) =>
          i === modalMode.linkIndex ? { ...l, ...linkForm } : l,
        ),
      });
    } else if (modalMode?.type === "addLink") {
      const col = footerColumns.find((c) => c.header === modalMode.colHeader);
      if (!col) return;
      updateFooterColumn(modalMode.colHeader, {
        links: [...col.links, linkForm],
      });
    } else if (modalMode?.type === "editBottom") {
      updateFooterBottom({ copyright: bottomForm.copyright });
    } else if (modalMode?.type === "editSocial") {
      updateFooterSocialLink(modalMode.platform, { href: socialForm.href });
    } else if (modalMode?.type === "addSocial") {
      addFooterSocialLink(socialForm);
    }
    handleClose();
  };

  const modalTitle =
    modalMode?.type === "editColumn"
      ? "Edit Footer Column"
      : modalMode?.type === "addColumn"
        ? "Add Footer Column"
        : modalMode?.type === "editLink"
          ? "Edit Contact Link"
          : modalMode?.type === "addLink"
            ? "Add Contact Link"
            : modalMode?.type === "editBottom"
              ? "Edit Footer Bottom"
              : modalMode?.type === "editSocial"
                ? "Edit Social Link"
                : "Add Social Link";

  return (
    <Box>
      {/* ── FOOTER DIV 1 ── */}
      <Box bg="white">
        <Container size="lg" pt={50} pb={50}>
          <SimpleGrid cols={{ base: 1, sm: 3, md: 5 }} spacing={0}>
            {footerColumns.map((col) => (
              <Box key={col.header}>
                {/* Column header */}
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
                      {col.isContact && (
                        <Tooltip label="Add Link" withArrow>
                          <ActionIcon
                            variant="light"
                            color="green"
                            radius="xl"
                            size="xs"
                            onClick={() => openAddLink(col.header)}
                          >
                            <IconPlus size={10} />
                          </ActionIcon>
                        </Tooltip>
                      )}
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
                      {isEditMode && (
                        <Group gap={4} style={{ flexShrink: 0 }}>
                          <Tooltip label="Edit" withArrow>
                            <ActionIcon
                              variant="light"
                              color="blue"
                              radius="xl"
                              size="xs"
                              onClick={() =>
                                openEditLink(col.header, link, index)
                              }
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
                              onClick={() =>
                                updateFooterColumn(col.header, {
                                  links: col.links.filter(
                                    (_, i) => i !== index,
                                  ),
                                })
                              }
                            >
                              <IconTrash size={10} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      )}
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

      {/* ── FOOTER DIV 2 ── */}
      <Box bg="#FAFAFA" py={25}>
        <Container size="lg">
          <Group justify="space-between">
            {/* Copyright */}
            <Group gap="xs" align={"center"}>
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

            {/* Social links */}
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

      {/* ── Shared Modal ── */}
      <Modal
        opened={opened}
        onClose={handleClose}
        title={modalTitle}
        centered
        size="sm"
      >
        <Stack gap="sm">
          {/* Plain column edit/add */}
          {(modalMode?.type === "editColumn" ||
            modalMode?.type === "addColumn") && (
            <>
              <TextInput
                label="Column Header"
                placeholder="Company Info"
                value={colForm.header}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setColForm((p) => ({ ...p, header: value }));
                }}
              />
              {!colForm.isContact && (
                <Textarea
                  label={
                    <Text fz="sm" fw={500}>
                      Links{" "}
                      <Text span c="gray" fz={11}>
                        (one per line)
                      </Text>
                    </Text>
                  }
                  placeholder={"About Us\nCareers\nBlog"}
                  autosize
                  minRows={4}
                  value={linksInput}
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setLinksInput(value);
                  }}
                />
              )}
            </>
          )}

          {(modalMode?.type === "editLink" ||
            modalMode?.type === "addLink") && (
            <>
              <TextInput
                label="Display Text"
                placeholder="(480) 555-0103"
                value={linkForm.title}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setLinkForm((p) => ({ ...p, title: value }));
                }}
              />
              <TextInput
                label="Link URL"
                placeholder="tel:+14805550103"
                value={linkForm.href}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setLinkForm((p) => ({ ...p, href: value }));
                }}
              />
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

          {/* Edit copyright */}
          {modalMode?.type === "editBottom" && (
            <TextInput
              label="Copyright Text"
              placeholder="Made With Love By..."
              value={bottomForm.copyright}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setBottomForm((p) => ({ ...p, copyright: value }));
              }}
            />
          )}
          {(modalMode?.type === "editSocial" ||
            modalMode?.type === "addSocial") && (
            <>
              <TextInput
                label="Platform"
                placeholder="facebook | instagram | twitter | youtube"
                value={socialForm.platform}
                disabled={modalMode.type === "editSocial"}
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
            </>
          )}

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleSave}
              disabled={
                ((modalMode?.type === "editColumn" ||
                  modalMode?.type === "addColumn") &&
                  !colForm.header.trim()) ||
                ((modalMode?.type === "editLink" ||
                  modalMode?.type === "addLink") &&
                  !linkForm.title.trim()) ||
                (modalMode?.type === "addSocial" && !socialForm.platform.trim())
              }
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
