import { Group, Text, Button, Anchor, Container, Box } from "@mantine/core";
import { navLinks } from "../../data/siteData";
import { IconChevronRight } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <Box>
      <Container size="md" py="md">
        <Group justify="space-between">
          <Text fw={700} fz={24} c="dark">
            Brandname
          </Text>
          <Group gap={32} visibleFrom="md">
            {navLinks.map((link) => (
              <Anchor
                key={link.label}
                href={link.href}
                c="dark"
                fz={14}
                fw={600}
                underline="never"
              >
                {link.label}
              </Anchor>
            ))}
          </Group>
          <Group gap="sm">
            <Anchor href="#" c="green" fw={700} fz={14} underline="never">
              Login
            </Anchor>
            <Button
              color="green"
              radius="md"
              px={20}
              h={40}
              fw={700}
              fz={14}
              rightSection={<IconChevronRight size={16} stroke={2.5} />}
            >
              JOIN US
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
