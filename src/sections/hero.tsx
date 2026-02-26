import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Group,
  Box,
  Image,
} from "@mantine/core";
import { defaultData } from "../data/siteData";

const heroContent = defaultData.heroSectionContent;
const titleLines  = heroContent.title.split("\n");

export default function Hero() {
  return (
    <Container size="xl" py={{ base: 48, md: 80 }}>
      <Grid align="center" gutter="xs">

        {/* ── LEFT ── */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text c="green" fw={700} fz={14} mb="lg">
            {heroContent.label}
          </Text>

          <Title
            order={1}
            c="dark"
            fw={800}
            mb="xl"
            style={{ fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.15 }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </Title>

          <Text c="gray" fz="h4" fw={400} lh="20px" mb="xl" maw={340}>
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

        {/* ── RIGHT ── */}
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
    </Container>
  );
}
