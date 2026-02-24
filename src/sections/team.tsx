import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Image,
  Group,
  Box,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  Button,
  Stack,
  Tooltip,
  Divider,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconEdit,
  IconTrash,
  IconPlus,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { useSiteData } from "../context/site-data-context";
import type { TeamContent, TeamMember } from "../types/types";

// ── Types ─────────────────────────────────────────────────
type MemberLink = NonNullable<TeamMember["links"]>[number];

// ── Helpers ───────────────────────────────────────────────
function MemberSocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <IconBrandInstagram size={20} />;
  if (platform === "twitter") return <IconBrandTwitter size={20} />;
  return <IconBrandFacebook size={20} />;
}

const emptyMember: TeamMember = {
  id: 0,
  name: "",
  profession: "",
  image: "",
  links: [],
};
const emptyLink: MemberLink = { platform: "", href: "" };

// ── Modal mode for links ──────────────────────────────────
type LinkModalMode =
  | { type: "editLink"; linkIndex: number }
  | { type: "addLink" }
  | null;

export default function Team() {
  const {
    data,
    isEditMode,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    updateTeamSection,
  } = useSiteData();

  const { label, title, description, teamMembers } = data.teamSectionContent;

  // ── Responsive carousel ───────────────────────────────
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 992px)");
  const slidesToScroll = isMobile ? 1 : isTablet ? 2 : 4;

  // ── Section modal ─────────────────────────────────────
  const [sectionOpened, { open: openSection, close: closeSection }] =
    useDisclosure(false);
  const [sectionForm, setSectionForm] = useState<
    Pick<TeamContent, "label" | "title" | "description">
  >(() => ({ label, title, description }));

  const handleSectionOpen = () => {
    setSectionForm({
      label: data.teamSectionContent.label,
      title: data.teamSectionContent.title,
      description: data.teamSectionContent.description,
    });
    openSection();
  };

  const handleSectionSave = () => {
    updateTeamSection(sectionForm);
    closeSection();
  };

  // ── Member modal ──────────────────────────────────────
  const [memberOpened, { open: openMember, close: closeMember }] =
    useDisclosure(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState<TeamMember>(() => ({
    ...emptyMember,
  }));

  // ── Link sub-modal (inside member modal) ──────────────
  const [linkModalMode, setLinkModalMode] = useState<LinkModalMode>(null);
  const [linkForm, setLinkForm] = useState<MemberLink>({ ...emptyLink });
  const [linkModalOpened, { open: openLinkModal, close: closeLinkModal }] =
    useDisclosure(false);

  const openEditLink = (link: MemberLink, index: number) => {
    setLinkForm({ ...link });
    setLinkModalMode({ type: "editLink", linkIndex: index });
    openLinkModal();
  };

  const openAddLink = () => {
    setLinkForm({ ...emptyLink });
    setLinkModalMode({ type: "addLink" });
    openLinkModal();
  };

  const handleLinkSave = () => {
    const currentLinks = memberForm.links ?? [];
    if (linkModalMode?.type === "editLink") {
      const updated = currentLinks.map((l, i) =>
        i === linkModalMode.linkIndex ? { ...linkForm } : l,
      );
      setMemberForm((p) => ({ ...p, links: updated }));
    } else if (linkModalMode?.type === "addLink") {
      setMemberForm((p) => ({ ...p, links: [...currentLinks, linkForm] }));
    }
    closeLinkModal();
    setLinkModalMode(null);
  };

  const handleRemoveLink = (index: number) => {
    setMemberForm((p) => ({
      ...p,
      links: (p.links ?? []).filter((_, i) => i !== index),
    }));
  };

  // ── Member CRUD ───────────────────────────────────────
  const openAdd = () => {
    setEditing(null);
    setMemberForm({ ...emptyMember, id: Date.now(), links: [] });
    openMember();
  };

  const openEdit = (member: TeamMember) => {
    setEditing(member);
    setMemberForm({ ...member, links: [...(member.links ?? [])] });
    openMember();
  };

  const handleMemberSave = () => {
    if (editing) {
      // ✅ updateTeamMember(id, Partial<TeamMember>) — links included automatically
      updateTeamMember(editing.id, memberForm);
    } else {
      addTeamMember(memberForm);
    }
    closeMember();
  };

  // ── Carousel slides ───────────────────────────────────
  const slides = teamMembers.map((member) => (
    <Carousel.Slide key={member.id}>
      <Card
        shadow="sm"
        radius={20}
        p={0}
        style={{ overflow: "hidden", border: "1px solid #E8E8E8" }}
      >
        <Box style={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
          <Image
            src={member.image}
            alt={member.name}
            w="100%"
            h="100%"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box ta="center" p={30} style={{ borderTop: "1px solid #E8E8E8" }}>
          <Text fw={700} c="dark" fz={14} mb={4}>
            {member.name}
          </Text>
          <Text c="gray" fz={12} fw={400} mb="sm">
            {member.profession}
          </Text>

          {/* ✅ Dynamic social links from member.links */}
          <Group justify="center" gap="xs" mb={isEditMode ? "sm" : 0}>
            {(member.links ?? []).length > 0 ? (
              member.links!.map((link, i) => (
                <ActionIcon
                  key={i}
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MemberSocialIcon platform={link.platform} />
                </ActionIcon>
              ))
            ) : (
              // ── Fallback static icons if no links defined ──
              <>
                <ActionIcon
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                >
                  <IconBrandFacebook size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                >
                  <IconBrandInstagram size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                >
                  <IconBrandTwitter size={20} />
                </ActionIcon>
              </>
            )}
          </Group>

          {isEditMode && (
            <Group justify="center" gap={6}>
              <Tooltip label="Edit" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  radius="xl"
                  size="sm"
                  onClick={() => openEdit(member)}
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
                  onClick={() => removeTeamMember(member.id)}
                >
                  <IconTrash size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
        </Box>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Box bg="white">
      <Container size="xl" py={112}>
        {/* Section header */}
        <Group justify="space-between" align="flex-start" mb={4}>
          <Group gap="xs" align="center">
            <Text c="green" fw={700} fz={14}>
              {label}
            </Text>
            {isEditMode && (
              <Tooltip label="Edit Team Section" withArrow>
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
          {isEditMode && (
            <Tooltip label="Add Member" withArrow>
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

        <Title order={2} c="dark" fw={800} mb="xs" fz="h3">
          {title}
        </Title>
        <Text c="gray" fw={400} fz={14} lh={1.7} mb="xl" maw={440}>
          {description}
        </Text>

        <Carousel
          slideSize={{ base: "100%", sm: "50%", md: "25%" }}
          slideGap={{ base: "md", sm: "lg" }}
          emblaOptions={{ loop: true, align: "start", slidesToScroll }}
          withControls
          withIndicators
          nextControlIcon={<IconArrowRight size={16} />}
          previousControlIcon={<IconArrowLeft size={16} />}
          styles={{
            control: {
              backgroundColor: "white",
              border: "1px solid #E8E8E8",
              color: "#2f9e44",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
            indicator: {
              backgroundColor: "#2f9e44",
              width: 8,
              height: 8,
              borderRadius: "50%",
            },
            container: { marginBottom: "40px" },
          }}
        >
          {slides}
        </Carousel>
      </Container>

      {/* ── Section Edit Modal ── */}
      <Modal
        opened={sectionOpened}
        onClose={closeSection}
        title="Edit Team Section"
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Label (above title)"
            placeholder="Team"
            value={sectionForm.label}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSectionForm((p) => ({ ...p, label: value }));
            }}
          />
          <TextInput
            label="Title"
            placeholder="Get Quality Education"
            value={sectionForm.title}
            onChange={(e) => {
              const value = e.currentTarget.value;
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
              const value = e.currentTarget.value;
              setSectionForm((p) => ({ ...p, description: value }));
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

      {/* ── Member Add/Edit Modal ── */}
      <Modal
        opened={memberOpened}
        onClose={closeMember}
        title={editing ? "Edit Team Member" : "Add Team Member"}
        centered
        size="md"
      >
        <Stack gap="sm">
          <TextInput
            label="Full Name"
            placeholder="Julian Jameson"
            value={memberForm.name}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setMemberForm((p) => ({ ...p, name: value }));
            }}
          />
          <TextInput
            label="Profession"
            placeholder="Developer"
            value={memberForm.profession}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setMemberForm((p) => ({ ...p, profession: value }));
            }}
          />
          <TextInput
            label="Image URL"
            placeholder="https://i.pravatar.cc/300"
            value={memberForm.image}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setMemberForm((p) => ({ ...p, image: value }));
            }}
          />
          {memberForm.image && (
            <Box
              w={80}
              h={80}
              mx="auto"
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #E8E8E8",
              }}
            >
              <Image
                src={memberForm.image}
                alt="preview"
                w="100%"
                h="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>
          )}

          {/* ── Social Links manager ── */}
          <Divider label="Social Links" labelPosition="left" />

          <Stack gap={6}>
            {(memberForm.links ?? []).map((link, index) => (
              <Group
                key={index}
                gap={8}
                align="center"
                justify="space-between"
                p={8}
                style={{ border: "1px solid #E8E8E8", borderRadius: 8 }}
              >
                <Group gap={8}>
                  <ActionIcon variant="subtle" color="green" size="sm">
                    <MemberSocialIcon platform={link.platform} />
                  </ActionIcon>
                  <Box>
                    <Text fz={12} fw={600} c="dark" tt="capitalize">
                      {link.platform || "—"}
                    </Text>
                    <Text fz={11} c="gray" style={{ wordBreak: "break-all" }}>
                      {link.href || "no url"}
                    </Text>
                  </Box>
                </Group>
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
                      onClick={() => handleRemoveLink(index)}
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
              Add Social Link
            </Button>
          </Stack>

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeMember}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleMemberSave}
              disabled={!memberForm.name.trim()}
            >
              {editing ? "Save Changes" : "Add Member"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* ── Link Add/Edit Sub-Modal ── */}
      <Modal
        opened={linkModalOpened}
        onClose={closeLinkModal}
        title={
          linkModalMode?.type === "editLink"
            ? "Edit Social Link"
            : "Add Social Link"
        }
        centered
        size="xs"
        // ✅ higher z-index so it sits above the member modal
        zIndex={400}
      >
        <Stack gap="sm">
          <TextInput
            label="Platform"
            placeholder="facebook | instagram | twitter"
            value={linkForm.platform}
            disabled={linkModalMode?.type === "editLink"} // ✅ platform is the key
            onChange={(e) => {
              const value = e.currentTarget.value;
              setLinkForm((p) => ({ ...p, platform: value }));
            }}
          />
          <TextInput
            label="URL"
            placeholder="https://facebook.com/username"
            value={linkForm.href}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setLinkForm((p) => ({ ...p, href: value }));
            }}
          />
          {/* Icon preview */}
          <Group gap={8} align="center">
            <Text fz="xs" c="gray">
              Preview:
            </Text>
            <ActionIcon variant="subtle" color="green">
              <MemberSocialIcon platform={linkForm.platform} />
            </ActionIcon>
          </Group>
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeLinkModal}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleLinkSave}
              disabled={!linkForm.platform.trim() || !linkForm.href.trim()}
            >
              {linkModalMode?.type === "editLink" ? "Save Changes" : "Add Link"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
