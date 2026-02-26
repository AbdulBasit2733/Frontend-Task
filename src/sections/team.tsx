import {
  Container,
  Title,
  Text,
  Card,
  Image,
  Group,
  Box,
  ActionIcon,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { defaultData } from "../data/siteData";

const { label, title, description, teamMembers } =
  defaultData.teamSectionContent;

function MemberSocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <IconBrandInstagram size={20} />;
  if (platform === "twitter")   return <IconBrandTwitter size={20} />;
  return <IconBrandFacebook size={20} />;
}

export default function Team() {
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 992px)");
  const slidesToScroll = isMobile ? 1 : isTablet ? 2 : 4;

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

          {/* Dynamic social links or fallback static icons */}
          <Group justify="center" gap="xs">
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
              <>
                <ActionIcon variant="subtle" color="green" radius="xl" size="sm">
                  <IconBrandFacebook size={20} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="green" radius="xl" size="sm">
                  <IconBrandInstagram size={20} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="green" radius="xl" size="sm">
                  <IconBrandTwitter size={20} />
                </ActionIcon>
              </>
            )}
          </Group>
        </Box>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Box bg="white">
      <Container size="xl" py={112}>
        {/* Section header */}
        <Text c="green" fw={700} fz={14} mb={4}>
          {label}
        </Text>

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
    </Box>
  );
}
