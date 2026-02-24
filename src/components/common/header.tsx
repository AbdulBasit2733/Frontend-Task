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

const emptyLink: NavLink = { label: "", href: "" };

type SettingsForm = {
  brandName: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
};

export default function Navbar() {
  const {
    data,
    isEditMode,
    addNavLink,
    removeNavLink,
    updateNavLink,
    updateNavbarContent,
  } = useSiteData();

  const { brandName, navLinks, primaryButton, secondaryButton } =
    data.navbarSectionContent;

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [linkOpened, { open: openLink, close: closeLink }] =
    useDisclosure(false);
  const [editing, setEditing] = useState<NavLink | null>(null);
  const [linkForm, setLinkForm] = useState<NavLink>(emptyLink);

  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);

  const buildSettingsForm = (): SettingsForm => ({
    brandName: data.navbarSectionContent.brandName,
    primaryButtonLabel: data.navbarSectionContent.primaryButton.label,
    primaryButtonHref: data.navbarSectionContent.primaryButton.href,
    secondaryButtonLabel: data.navbarSectionContent.secondaryButton.label,
    secondaryButtonHref: data.navbarSectionContent.secondaryButton.href,
  });

  const [settingsForm, setSettingsForm] =
    useState<SettingsForm>(buildSettingsForm);

  const handleLinkChange = (field: keyof NavLink, value: string) =>
    setLinkForm((p) => ({ ...p, [field]: value }));

  const openAdd = () => {
    setEditing(null);
    setLinkForm({ ...emptyLink });
    openLink();
  };

  const openEdit = (link: NavLink) => {
    setEditing(link);
    setLinkForm({ ...link });
    openLink();
  };

  const handleLinkSave = () => {
    if (editing) {
      updateNavLink(editing.label, linkForm);
    } else {
      addNavLink(linkForm);
    }
    closeLink();
  };

  const openNavbarSettings = () => {
    setSettingsForm(buildSettingsForm());
    openSettings();
  };

  const handleSettingsSave = () => {
    updateNavbarContent({
      brandName: settingsForm.brandName,
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

  const NavLinkItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <Group key={link.label} gap={4} align="center">
          <Anchor
            href={link.href}
            c="gray"
            fz={14}
            fw={600}
            underline="never"
            onClick={onNavigate}
          >
            {link.label}
          </Anchor>
          {isEditMode && (
            <Group gap={2}>
              <Tooltip label="Edit Link" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  radius="xl"
                  size="xs"
                  onClick={() => openEdit(link)}
                >
                  <IconEdit size={10} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Remove Link" withArrow>
                <ActionIcon
                  variant="light"
                  color="red"
                  radius="xl"
                  size="xs"
                  onClick={() => removeNavLink(link.label)}
                >
                  <IconTrash size={10} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
        </Group>
      ))}

      {isEditMode && (
        <Tooltip label="Add Nav Link" withArrow>
          <ActionIcon
            variant="light"
            color="green"
            radius="xl"
            size="sm"
            onClick={openAdd}
          >
            <IconPlus size={14} />
          </ActionIcon>
        </Tooltip>
      )}
    </>
  );

  return (
    <Box style={{ borderBottom: "1px solid #f0f0f0" }}>
      <Container size="lg" py="md">
        <Group justify="space-between">
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

          <Group gap={32} visibleFrom="md">
            <NavLinkItems />
          </Group>

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
        closeButtonProps={{
          icon: <IconX size={18} />,
        }}
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

      <Modal
        opened={linkOpened}
        onClose={closeLink}
        title={editing ? "Edit Nav Link" : "Add Nav Link"}
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Label"
            placeholder="Home"
            value={linkForm.label}
            onChange={(e) => handleLinkChange("label", e.currentTarget.value)}
          />
          <TextInput
            label="URL"
            placeholder="#home"
            value={linkForm.href}
            onChange={(e) => handleLinkChange("href", e.currentTarget.value)}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeLink}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleLinkSave}
              disabled={!linkForm.label.trim()}
            >
              {editing ? "Save Changes" : "Add Link"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={settingsOpened}
        onClose={closeSettings}
        title="Edit Navbar Settings"
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Brand Name"
            placeholder="Brandname"
            value={settingsForm.brandName}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSettingsForm((p) => ({ ...p, brandName: value }));
            }}
          />
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
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeSettings}>
              Cancel
            </Button>
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
    </Box>
  );
}
