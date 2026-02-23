import {
  Box,
  Container,
  SimpleGrid,
  Title,
  Text,
  Anchor,
  Group,
  ActionIcon,
  Divider,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconPhone,
  IconMapPin,
  IconMail,
} from "@tabler/icons-react";
import { footerColumns } from "../../data/siteData";

export default function Footer() {
  return (
    <Box bg="white" pt={60} pb="md">
      <Container size="xl">
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="xl" mb="xl">
          {footerColumns.map((col) => (
            <Box key={col.title}>
              <Title order={6} c="dark" fw={700} mb="md">
                {col.title}
              </Title>
              {col.links.map((link) => (
                <Text
                  key={link}
                  c="gray"
                  fz="sm"
                  mb={6}
                  style={{ cursor: "pointer" }}
                >
                  {link}
                </Text>
              ))}
            </Box>
          ))}
          <Box>
            <Title order={6} c="dark" fw={700} mb="md">
              Get In Touch
            </Title>
            <Group gap="xs" mb="xs" align="flex-start">
              <IconPhone size={16} color="#737373" />
              <Text c="gray" fz="sm">
                (480) 555-0103
              </Text>
            </Group>
            <Group gap="xs" mb="xs" align="flex-start">
              <IconMapPin size={16} color="#737373" />
              <Text c="gray" fz="sm">
                4517 Washington Ave. Manchester, Kentucky 39495
              </Text>
            </Group>
            <Group gap="xs" align="flex-start">
              <IconMail size={16} color="#737373" />
              <Text c="gray" fz="sm">
                debra.holt@example.com
              </Text>
            </Group>
          </Box>
        </SimpleGrid>
        <Divider mb="md" />
        <Group justify="space-between">
          <Text c="gray" fz="xs">
            Made With Love By Figmaland All Right Reserved
          </Text>
          <Group gap="xs">
            <ActionIcon variant="subtle" color="gray" radius="xl">
              <IconBrandFacebook size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" radius="xl">
              <IconBrandInstagram size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" radius="xl">
              <IconBrandTwitter size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
