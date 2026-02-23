import { Group, Text, Button, Anchor, Container } from "@mantine/core";
import { navLinks } from "../../data/siteData";
import { IconArrowRight } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <Container size="xl" py="md">
      <Group justify="space-between">
        <Text fw={700} size="24px" c="dark">
          Brandname
        </Text>
        <Group gap="xl" visibleFrom="sm">
          {navLinks.map((link) => (
            <Anchor
              key={link.label}
              href={link.href}
              c="dark"
              fz="sm"
              fw={500}
              underline="never"
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
        <Group>
          <Anchor href="#" c="green" fw={600} fz="sm" underline="never">
            Login
          </Anchor>
          <Button
            color="green"
            radius="md"
            rightSection={<IconArrowRight size={16} />}
          >
            JOIN US
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
