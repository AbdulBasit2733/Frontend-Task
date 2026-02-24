import { useState } from "react";
import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Group,
  Box,
  Image,
  Modal,
  TextInput,
  Textarea,
  Stack,
  ActionIcon,
  Tooltip,
  FileButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useSiteData } from "../../context/site-data-context";
import type { HeroContent } from "../../types/types";

export default function Hero() {
  const { data, updateHeroContent, isEditMode } = useSiteData();
  const heroContent = data.heroSectionContent;

  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState<HeroContent>(() => ({
    ...data.heroSectionContent,
  }));
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (field: keyof HeroContent, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleOpen = () => {
    setForm({ ...heroContent });
    setPreviewImage(null);
    open();
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      if (img.width < 300 || img.height < 300) {
        alert("Image too small. Minimum 300×300 px required.");
        URL.revokeObjectURL(url);
        return;
      }
      setPreviewImage(url);
      setForm((p) => ({ ...p, image: url }));
    };
    img.src = url;
  };

  const handleSave = () => {
    updateHeroContent(form);
    close();
  };

  const titleLines = heroContent.title.split("\n");

  return (
    <Container size="xl" py={{ base: 48, md: 80 }}>
      <Grid align="center" gutter="xl">
        {/* ── LEFT ── */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Group align="center" gap="xs" mb={10}>
            <Text c="green" fw={700} fz={14}>
              {heroContent.label}
            </Text>
            {isEditMode && (
              <Tooltip label="Edit Hero" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  radius="xl"
                  size="sm"
                  onClick={handleOpen}
                >
                  <IconEdit size={14} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>

          <Title
            order={1}
            c="dark"
            fw={800}
            mb="md"
            style={{ fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.15 }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </Title>

          <Text c="gray" fz={14} fw={400} lh="20px" mb="xl" maw={340}>
            {heroContent.description}
          </Text>

          <Group gap="md">
            <Button color="green" size="md" radius={5} px={40} h={52} fw={700}>
              {heroContent.primaryBtn}
            </Button>
            <Button
              variant="outline"
              color="green"
              size="md"
              radius={5}
              px={40}
              h={52}
              fw={700}
            >
              {heroContent.secondaryBtn}
            </Button>
          </Group>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box ta="right">
            <Image
              src={heroContent.image}
              alt="Student"
              w="100%"
              style={{ minHeight: 480, objectFit: "cover" }}
            />
          </Box>
        </Grid.Col>
      </Grid>

      <Modal
        opened={opened}
        onClose={close}
        title="Edit Hero Section"
        centered
        size="md"
      >
        <Stack gap="sm">
          <TextInput
            label="Label (above title)"
            placeholder="Welcome"
            value={form.label}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅ read sync
              handleChange("label", value);
            }}
          />

          <Textarea
            label={
              <Text fz="sm" fw={500}>
                Title{" "}
                <Text span c="gray" fz={11}>
                  (use \n for line break)
                </Text>
              </Text>
            }
            placeholder={"Best Learning\nOpportunities"}
            autosize
            minRows={2}
            value={form.title}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handleChange("title", value);
            }}
          />

          <Textarea
            label="Description"
            placeholder="Our goal is to make online education..."
            autosize
            minRows={2}
            value={form.description}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handleChange("description", value);
            }}
          />

          <TextInput
            label="Primary Button Text"
            placeholder="Join Us"
            value={form.primaryBtn}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handleChange("primaryBtn", value);
            }}
          />

          <TextInput
            label="Secondary Button Text"
            placeholder="Learn More"
            value={form.secondaryBtn}
            onChange={(e) => {
              const value = e.currentTarget.value; // ✅
              handleChange("secondaryBtn", value);
            }}
          />

          {/* ── Image Upload ── */}
          <Box>
            <Text fz="sm" fw={500} mb={4}>
              Hero Image{" "}
              <Text span c="gray" fz={11}>
                (min 300×300px, recommended 600×480px, PNG preferred)
              </Text>
            </Text>

            <Box
              mb="xs"
              style={{
                width: "100%",
                height: 140,
                border: "1px dashed #ccc",
                borderRadius: 8,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fafafa",
              }}
            >
              <Image
                src={previewImage ?? form.image}
                alt="Preview"
                style={{ maxHeight: 130, objectFit: "contain" }}
              />
            </Box>

            <Group gap="sm">
              <FileButton onChange={handleImageUpload} accept="image/*">
                {(props) => (
                  <Button {...props} variant="light" color="green" size="xs">
                    Upload Image
                  </Button>
                )}
              </FileButton>
              <TextInput
                placeholder="Or paste image URL"
                size="xs"
                style={{ flex: 1 }}
                value={form.image.startsWith("blob:") ? "" : form.image}
                onChange={(e) => {
                  const value = e.currentTarget.value; // ✅
                  setPreviewImage(null);
                  handleChange("image", value);
                }}
              />
            </Group>
          </Box>

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSave}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
