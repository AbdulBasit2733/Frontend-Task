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
import { packages } from "../data/siteData";
import { IconChevronRight } from "@tabler/icons-react";

export default function Packages() {
  return (
    <Box bg="white" mt={14}>
      <Container size="lg" py={160}>
        <Grid align="flex-start" gutter={40}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box
              w={94}
              h={7}
              bg="#E74040"
              mb="md"
              style={{ borderRadius: 2 }}
            />
            <Title
              order={2}
              c="dark"
              fw={700}
              mb="md"
              style={{ fontSize: 40, lineHeight: "50px" }}
            >
              Affordable Packages
            </Title>
            <Text c="gray" fz={14} fw={400} lh="20px" mb="lg">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </Text>
            <Anchor
              href="#"
              c="green"
              fw={700}
              fz={14}
              underline="never"
              display="flex"
              style={{ alignItems: "center", gap: 4 }}
            >
              Learn More
              <IconChevronRight size={16} stroke={2.5} />
            </Anchor>
          </Grid.Col>

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
                <Text c="gray" fw={400} fz="sm" lh={1.6}>
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
