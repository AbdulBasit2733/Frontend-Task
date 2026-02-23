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
import classes from "./packages.module.css";
import { packages } from "../data/siteData";
import { IconArrowRight } from "@tabler/icons-react";

export default function Packages() {
  return (
    <Container size="xl" py={80}>
      <Grid align="flex-start" gutter="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box w={94} h={7} bg="#E74040" mb="sm" style={{ borderRadius: 2 }} />
          <Title order={2} c="dark" size={"40px"} lh={"50px"} fw={700} mb="md">
            Affordable Packages
          </Title>
          <Text c="gray" fz={"14px"} fw={400} lh={"20px"} mb="md">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </Text>
          <Anchor
            href="#"
            c="green"
            fw={700}
            fz="14px"
            lh="24px"
            underline="never"
            display="flex"
            align="center"
            gap="4px"
            className={classes.anchorWithArrow}
          >
            Learn More
            <span className={classes.icon}>
              <IconArrowRight size={18} stroke={2} />
            </span>
          </Anchor>
        </Grid.Col>
        {packages.map((pkg) => (
          <Grid.Col key={pkg.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Paper shadow="sm" radius="md" p="xl" withBorder={false}>
              <ThemeIcon
                color="green"
                variant="light"
                size={48}
                radius="md"
                mb="md"
              >
                <img
                  src={pkg.icon}
                  alt={pkg.title}
                  style={{ width: 24, height: 24 }}
                />
              </ThemeIcon>
              <Title order={5} c="dark" fw={700} mb={4}>
                {pkg.title}
              </Title>
              <Box w={50} h={2} bg="red" mb="sm" style={{ borderRadius: 2 }} />
              <Text c="gray" fz="sm">
                {pkg.description}
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
