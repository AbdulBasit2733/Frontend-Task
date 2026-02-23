import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Group,
  ActionIcon,
  Box,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { teamMembers } from "../data/siteData";

export default function Team() {
  return (
    <Container size="xl" py={80}>
      <Text c="green" fw={600} fz="sm" mb={4}>
        Team
      </Text>
      <Title order={2} c="dark" fw={800} mb="xs">
        Get Quality Education
      </Title>
      <Text c="gray" fz="sm" mb="xl" maw={400}>
        Problems trying to resolve the conflict between the two major realms of
        Classical physics: Newtonian mechanics
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {teamMembers.map((member) => (
          <Card key={member.id} shadow="sm" radius="md" pb="md" p={0}>
            <Image src={member.image} height={200} alt={member.name} />
            <Box ta="center" pt="md" pb="sm" px="md">
              <Text fw={700} c="dark" fz="sm">
                {member.name}
              </Text>
              <Text c="gray" fz="xs" mb="sm">
                {member.profession}
              </Text>
              <Group justify="center" gap="xs">
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
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
