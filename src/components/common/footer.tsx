import {
  Box,
  Container,
  SimpleGrid,
  Title,
  Text,
  Group,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { footerColumns } from "../../data/siteData";
import {
  IconPhone,
  IconMapPin,
  IconMail,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <Box>
      <Box bg={"white"}>
        <Container size="lg" pt={"50px"} pb="50px">
          <SimpleGrid cols={{ base: 1, sm: 3, md: 5 }} spacing={0}>
            {footerColumns.map((col) => (
              <Box key={col.title}>
                <Title order={6} fz={"h5"} c="dark" fw={700} mb="md">
                  {col.title}
                </Title>
                {col.links.map((link) => (
                  <Text
                    key={link}
                    c="gray"
                    fz="14px"
                    fw={700}
                    mb={6}
                    style={{ cursor: "pointer" }}
                  >
                    {link}
                  </Text>
                ))}
              </Box>
            ))}
            <Box>
              <Title order={6} c="dark" fz={"h5"} fw={700} mb="md">
                Get In Touch
              </Title>
              <Group gap={10} mb="xs" align="center" display={"flex"}>
                <ActionIcon variant="white">
                  <IconPhone color={"#96BA7B"} size={24} />
                </ActionIcon>
                <Text c="gray" fz={14} fw={700}>
                  (480) 555-0103
                </Text>
              </Group>
              <Group gap="xs" mb="xs" align="center" display={"flex"}>
                <ActionIcon variant="white">
                  <IconMapPin color={"#96BA7B"} size={24} />
                </ActionIcon>
                <Text c="gray" fz={14} fw={700}>
                  4517 Washington Ave. Manchester, Kentucky 39495
                </Text>
              </Group>
              <Group gap="xs" align="center" display={"flex"}>
                <ActionIcon variant="white">
                  <IconMail color={"#96BA7B"} size={24} />
                </ActionIcon>
                <Text c="gray" fz={14} fw={700}>
                  debra.holt@example.com
                </Text>
              </Group>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Box bg="#FAFAFA" py={25}>
        <Container size={"lg"}>
          <Group justify="space-between">
            <Text c="gray" fz={"h6"} fw={700}>
              Made With Love By Figmaland All Right Reserved
            </Text>
            <Group gap="xs">
              <ActionIcon variant="subtle" color="green">
                <IconBrandFacebook size={20} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="green">
                <IconBrandInstagram size={20} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="green">
                <IconBrandTwitter size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
