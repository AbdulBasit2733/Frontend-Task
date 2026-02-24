import { useState } from "react";
import {
  Group,
  Text,
  Button,
  Anchor,
  Container,
  Box,
  Modal,
  TextInput,
  Stack,
  ActionIcon,
  Tooltip,
  Drawer,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronRight,
  IconEdit,
  IconTrash,
  IconPlus,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { useSiteData } from "../../context/site-data-context";
import type { NavLink } from "../../types/types";

// ── Types ─────────────────────────────────────────────
type SettingsForm = {
  brandName: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  navLinks: NavLink[]; // ✅ staged nav links live here
};

type LinkSubMode =
  | { type: "editLink"; index: number }
  | { type: "addLink" }
  | null;

const emptyLink: NavLink = { label: "", href: "" };

export default function Navbar() {
  const { data, isEditMode, updateNavbarContent } = useSiteData();

  const { brandName, navLinks, primaryButton, secondaryButton } =
    data.navbarSectionContent;

  // ── Mobile drawer ─────────────────────────────────────
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  // ── Settings modal ────────────────────────────────────
  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);

  const buildSettingsForm = (): SettingsForm => ({
    brandName: data.navbarSectionContent.brandName,
    primaryButtonLabel: data.navbarSectionContent.primaryButton.label,
    primaryButtonHref: data.navbarSectionContent.primaryButton.href,
    secondaryButtonLabel: data.navbarSectionContent.secondaryButton.label,
    secondaryButtonHref: data.navbarSectionContent.secondaryButton.href,
    navLinks: data.navbarSectionContent.navLinks.map((l) => ({ ...l })),
  });

  const [settingsForm, setSettingsForm] =
    useState<SettingsForm>(buildSettingsForm);

  const openNavbarSettings = () => {
    setSettingsForm(buildSettingsForm()); // ✅ reset to latest on open
    openSettings();
  };

  // ✅ ONE call — commits brand, buttons AND full navLinks array
  const handleSettingsSave = () => {
    updateNavbarContent({
      brandName: settingsForm.brandName,
      navLinks: settingsForm.navLinks,
      primaryButton: {
        label: settingsForm.primaryButtonLabel,
        href: settingsForm.primaryButtonHref,
      },
      secondaryButton: {
        label: settingsForm.secondaryButtonLabel,
        href: settingsForm.secondaryButtonHref,
      },
    });
    closeSettings();
  };

  // ── Link sub-modal (inside settings modal) ────────────
  const [linkSubMode, setLinkSubMode] = useState<LinkSubMode>(null);
  const [linkSubOpened, { open: openLinkSub, close: closeLinkSub }] =
    useDisclosure(false);
  const [linkForm, setLinkForm] = useState<NavLink>({ ...emptyLink });

  const openEditLink = (link: NavLink, index: number) => {
    setLinkForm({ ...link });
    setLinkSubMode({ type: "editLink", index });
    openLinkSub();
  };

  const openAddLink = () => {
    setLinkForm({ ...emptyLink });
    setLinkSubMode({ type: "addLink" });
    openLinkSub();
  };

  // ✅ Only mutates settingsForm.navLinks — no context call yet
  const handleLinkSubSave = () => {
    if (linkSubMode?.type === "editLink") {
      setSettingsForm((p) => ({
        ...p,
        navLinks: p.navLinks.map((l, i) =>
          i === linkSubMode.index ? { ...linkForm } : l,
        ),
      }));
    } else if (linkSubMode?.type === "addLink") {
      setSettingsForm((p) => ({
        ...p,
        navLinks: [...p.navLinks, { ...linkForm }],
      }));
    }
    closeLinkSub();
    setLinkSubMode(null);
  };

  const handleRemoveStagedLink = (index: number) => {
    setSettingsForm((p) => ({
      ...p,
      navLinks: p.navLinks.filter((_, i) => i !== index),
    }));
  };

  // ── Rendered nav links (from live context data) ───────
  const NavLinkItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <Anchor
          key={link.label}
          href={link.href}
          c="gray"
          fz={14}
          fw={600}
          underline="never"
          onClick={onNavigate}
        >
          {link.label}
        </Anchor>
      ))}
    </>
  );

  return (
    <Box style={{ borderBottom: "1px solid #f0f0f0" }}>
      <Container size="lg" py="md">
        <Group justify="space-between">
          {/* ── Logo + settings edit ── */}
          <Group gap={6} align="center">
            <Text fw={700} fz={24} c="dark">
              {brandName}
            </Text>
            {isEditMode && (
              <Tooltip label="Edit Navbar Settings" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  radius="xl"
                  size="xs"
                  onClick={openNavbarSettings}
                >
                  <IconEdit size={10} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>

          {/* ── Desktop nav links ── */}
          <Group gap={32} visibleFrom="md">
            <NavLinkItems />
          </Group>

          {/* ── Desktop: Login + CTA ── */}
          <Group gap="sm" visibleFrom="md">
            <Anchor
              href={primaryButton.href}
              c="green"
              fw={700}
              fz={14}
              underline="never"
            >
              {primaryButton.label}
            </Anchor>
            <Button
              component="a"
              href={secondaryButton.href}
              color="green"
              radius="md"
              px={20}
              h={40}
              fw={700}
              fz={14}
              rightSection={<IconChevronRight size={16} stroke={2.5} />}
            >
              {secondaryButton.label}
            </Button>
          </Group>

          {/* ── Mobile: Hamburger ── */}
          <ActionIcon
            hiddenFrom="md"
            variant="subtle"
            color="dark"
            size="lg"
            onClick={openDrawer}
            aria-label="Open navigation menu"
          >
            <IconMenu2 size={22} />
          </ActionIcon>
        </Group>
      </Container>

      {/* ── Mobile Drawer ── */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
        padding="md"
        title={
          <Text fw={700} fz={18} c="dark">
            {brandName}
          </Text>
        }
        closeButtonProps={{ icon: <IconX size={18} /> }}
        position="right"
        zIndex={1000}
      >
        <ScrollArea h="calc(100dvh - 80px)" mx="-md" px="md">
          <Stack gap="sm" mt="sm">
            <NavLinkItems onNavigate={closeDrawer} />
          </Stack>
          <Divider my="lg" />
          <Stack gap="sm">
            <Anchor
              href={primaryButton.href}
              c="green"
              fw={700}
              fz={15}
              underline="never"
              onClick={closeDrawer}
            >
              {primaryButton.label}
            </Anchor>
            <Button
              component="a"
              href={secondaryButton.href}
              color="green"
              radius="md"
              h={44}
              fw={700}
              fz={14}
              fullWidth
              rightSection={<IconChevronRight size={16} stroke={2.5} />}
              onClick={closeDrawer}
            >
              {secondaryButton.label}
            </Button>
          </Stack>
        </ScrollArea>
      </Drawer>

      {/* ══ SETTINGS MODAL — brand + buttons + staged nav links ══ */}
      <Modal
        opened={settingsOpened}
        onClose={closeSettings}
        title="Edit Navbar Settings"
        centered
        size="md"
      >
        <Stack gap="sm">
          {/* Brand */}
          <TextInput
            label="Brand Name"
            placeholder="Brandname"
            value={settingsForm.brandName}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSettingsForm((p) => ({ ...p, brandName: value }));
            }}
          />

          {/* Login button */}
          <Group grow>
            <TextInput
              label="Login Button Label"
              placeholder="Login"
              value={settingsForm.primaryButtonLabel}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setSettingsForm((p) => ({ ...p, primaryButtonLabel: value }));
              }}
            />
            <TextInput
              label="Login Button URL"
              placeholder="#"
              value={settingsForm.primaryButtonHref}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setSettingsForm((p) => ({ ...p, primaryButtonHref: value }));
              }}
            />
          </Group>

          {/* CTA button */}
          <Group grow>
            <TextInput
              label="CTA Button Label"
              placeholder="JOIN US"
              value={settingsForm.secondaryButtonLabel}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setSettingsForm((p) => ({ ...p, secondaryButtonLabel: value }));
              }}
            />
            <TextInput
              label="CTA Button URL"
              placeholder="#"
              value={settingsForm.secondaryButtonHref}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setSettingsForm((p) => ({ ...p, secondaryButtonHref: value }));
              }}
            />
          </Group>

          {/* ── Staged nav links ── */}
          <Divider label="Nav Links" labelPosition="left" mt="xs" />

          <Stack gap={6}>
            {settingsForm.navLinks.map((link, index) => (
              <Group
                key={index}
                gap={8}
                align="center"
                justify="space-between"
                p={8}
                style={{ border: "1px solid #E8E8E8", borderRadius: 8 }}
              >
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text fz={13} fw={600} c="dark" truncate>
                    {link.label || "—"}
                  </Text>
                  <Text fz={11} c="gray" truncate>
                    {link.href || "no url"}
                  </Text>
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
              Add Nav Link
            </Button>
          </Stack>

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeSettings}>
              Cancel
            </Button>
            {/* ✅ ONE save — commits brand + buttons + full navLinks */}
            <Button
              color="green"
              onClick={handleSettingsSave}
              disabled={!settingsForm.brandName.trim()}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ══ LINK SUB-MODAL (above settings modal) ════════ */}
      <Modal
        opened={linkSubOpened}
        onClose={() => {
          closeLinkSub();
          setLinkSubMode(null);
        }}
        title={
          linkSubMode?.type === "editLink" ? "Edit Nav Link" : "Add Nav Link"
        }
        centered
        size="sm"
        zIndex={400} // ✅ sits above the settings modal
      >
        <Stack gap="sm">
          <TextInput
            label="Label"
            placeholder="Home"
            value={linkForm.label}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setLinkForm((p) => ({ ...p, label: value }));
            }}
          />
          <TextInput
            label="URL"
            placeholder="#home"
            value={linkForm.href}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setLinkForm((p) => ({ ...p, href: value }));
            }}
          />
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
              disabled={!linkForm.label.trim()}
            >
              {linkSubMode?.type === "editLink" ? "Save" : "Add Link"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
