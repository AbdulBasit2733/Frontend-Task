import {
  Container,
  Grid,
  Title,
  Text,
  Anchor,
  Box,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { defaultData } from "../data/siteData";

const { title, description, anchorContent, packages } =
  defaultData.packageSectionContent;

export default function Packages() {
  const { hovered, ref: anchorRef } = useHover<HTMLAnchorElement>();

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

            <Title
              order={2}
              c="dark"
              fw={700}
              mb="md"
              style={{ fontSize: 40, lineHeight: "50px" }}
            >
              {title}
            </Title>

            <Text c="gray" fz={14} fw={400} lh="20px" my="xl" ta="left">
              {description}
            </Text>

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
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
