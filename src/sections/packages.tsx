import { useState } from "react";
import {
  Container,
  Grid,
  Title,
  Text,
  Anchor,
  Box,
  Paper,
  ThemeIcon,
  Modal,
  TextInput,
  Textarea,
  Button,
  Stack,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import {
  IconChevronRight,
  IconEdit,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useSiteData } from "../context/site-data-context";
import type { PackageContent, PackageItem } from "../types/types";

const emptyPkg: PackageItem = { id: 0, icon: "", title: "", description: "" };

export default function Packages() {
  const {
    data,
    isEditMode,
    addPackage,
    removePackage,
    updatePackage,
    updatePackageSection,
  } = useSiteData();

  const { title, description, anchorContent, packages } =
    data.packageSectionContent;

  // ── Hover for chevron animation ───────────────────────
  const { hovered, ref: anchorRef } = useHover<HTMLAnchorElement>();

  // ── Section edit modal ────────────────────────────────
  const [sectionOpened, { open: openSection, close: closeSection }] =
    useDisclosure(false);
  const [sectionForm, setSectionForm] = useState<
    Pick<PackageContent, "title" | "description" | "anchorContent">
  >(() => ({ title, description, anchorContent: { ...anchorContent } }));

  const handleSectionOpen = () => {
    // ✅ reset to latest context values on open
    const { title, description, anchorContent } = data.packageSectionContent;
    setSectionForm({ title, description, anchorContent: { ...anchorContent } });
    openSection();
  };

  const handleSectionSave = () => {
    updatePackageSection(sectionForm);
    closeSection();
  };

  // ── Package item modal ────────────────────────────────
  const [pkgOpened, { open: openPkg, close: closePkg }] = useDisclosure(false);
  const [editing, setEditing] = useState<PackageItem | null>(null);
  const [pkgForm, setPkgForm] = useState<PackageItem>(() => ({ ...emptyPkg }));

  const handlePkgChange = (field: keyof PackageItem, value: string) =>
    setPkgForm((p) => ({ ...p, [field]: value }));

  const openAdd = () => {
    setEditing(null);
    setPkgForm({ ...emptyPkg, id: Date.now() });
    openPkg();
  };

  const openEdit = (pkg: PackageItem) => {
    setEditing(pkg);
    setPkgForm({ ...pkg });
    openPkg();
  };

  const handlePkgSave = () => {
    if (editing) {
      updatePackage(editing.id, pkgForm);
    } else {
      addPackage(pkgForm);
    }
    closePkg();
  };

  return (
    <Box bg="white" mt={14}>
      <Container size="xl" py={112}>
        <Grid align="flex-start" gutter={40}>
          {/* ── Left col ── */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box
              w={94}
              h={7}
              bg="#E74040"
              mb="xl"
              style={{ borderRadius: 2 }}
            />

            {/* Title + edit icon */}
            <Group align="center" gap="xs" mb="md">
              <Title
                order={2}
                c="dark"
                fw={700}
                style={{ fontSize: 40, lineHeight: "50px" }}
              >
                {title}
              </Title>
              {isEditMode && (
                <Tooltip label="Edit Section" withArrow>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    radius="xl"
                    size="sm"
                    onClick={handleSectionOpen}
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>

            <Text c="gray" fz={14} fw={400} lh="20px" my="xl" ta="left">
              {description}
            </Text>

            <Group align="center" gap="md">
              {/* Learn More anchor with chevron animation */}
              <Anchor
                ref={anchorRef}
                href={anchorContent.href}
                c="green"
                fw={700}
                fz={14}
                underline="never"
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                {anchorContent.label}
                <IconChevronRight
                  size={16}
                  stroke={2.5}
                  style={{
                    transform: hovered ? "translateX(5px)" : "translateX(0px)",
                    transition: "transform 200ms ease",
                  }}
                />
              </Anchor>

              {/* Add package button */}
              {isEditMode && (
                <Tooltip label="Add Package" withArrow>
                  <ActionIcon
                    variant="light"
                    color="green"
                    radius="xl"
                    size="md"
                    onClick={openAdd}
                  >
                    <IconPlus size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </Grid.Col>

          {/* ── Package cards ── */}
          {packages.map((pkg) => (
            <Grid.Col key={pkg.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Paper shadow="md" radius="md" p="xl" h="100%">
                <ThemeIcon
                  color="green"
                  variant="filled"
                  size={52}
                  radius="md"
                  mb="md"
                >
                  <img
                    src={pkg.icon}
                    alt={pkg.title}
                    style={{ width: 28, height: 28 }}
                  />
                </ThemeIcon>
                <Title order={5} c="dark" fw={700} mb={6}>
                  {pkg.title}
                </Title>
                <Box
                  w={50}
                  h={2}
                  bg="#E74040"
                  mb="sm"
                  style={{ borderRadius: 2 }}
                />
                <Text c="gray" fw={400} fz="sm" lh={1.6} mb="md">
                  {pkg.description}
                </Text>

                {isEditMode && (
                  <Group gap={6}>
                    <Tooltip label="Edit" withArrow>
                      <ActionIcon
                        variant="light"
                        color="blue"
                        radius="xl"
                        size="sm"
                        onClick={() => openEdit(pkg)}
                      >
                        <IconEdit size={14} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Remove" withArrow>
                      <ActionIcon
                        variant="light"
                        color="red"
                        radius="xl"
                        size="sm"
                        onClick={() => removePackage(pkg.id)}
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                )}
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* ── Section Edit Modal ── */}
      <Modal
        opened={sectionOpened}
        onClose={closeSection}
        title="Edit Packages Section"
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Section Title"
            placeholder="Affordable Packages"
            value={sectionForm.title}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              setSectionForm((p) => ({ ...p, title: value }));
            }}
          />
          <Textarea
            label="Description"
            placeholder="Problems trying to resolve..."
            autosize
            minRows={2}
            value={sectionForm.description}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              setSectionForm((p) => ({ ...p, description: value }));
            }}
          />
          <TextInput
            label="Link Label"
            placeholder="Learn More"
            value={sectionForm.anchorContent.label}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              setSectionForm((p) => ({
                ...p,
                anchorContent: { ...p.anchorContent, label: value },
              }));
            }}
          />
          <TextInput
            label="Link URL"
            placeholder="#"
            value={sectionForm.anchorContent.href}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              setSectionForm((p) => ({
                ...p,
                anchorContent: { ...p.anchorContent, href: value },
              }));
            }}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeSection}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleSectionSave}
              disabled={!sectionForm.title.trim()}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ── Package Item Modal ── */}
      <Modal
        opened={pkgOpened}
        onClose={closePkg}
        title={editing ? "Edit Package" : "Add Package"}
        centered
      >
        <Stack gap="sm">
          <TextInput
            label="Title"
            placeholder="Certified Teacher"
            value={pkgForm.title}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handlePkgChange("title", value);
            }}
          />
          <Textarea
            label="Description"
            placeholder="Short description..."
            autosize
            minRows={2}
            value={pkgForm.description}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handlePkgChange("description", value);
            }}
          />
          <TextInput
            label="Icon path or URL"
            placeholder="/assets/icon.svg"
            value={pkgForm.icon}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handlePkgChange("icon", value);
            }}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closePkg}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handlePkgSave}
              disabled={!pkgForm.title.trim()}
            >
              {editing ? "Save Changes" : "Add Package"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
