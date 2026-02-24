import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Group,
  Box,
  ActionIcon,
} from "@mantine/core";
import { teamMembers } from "../data/siteData";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

export default function Team() {
  return (
    <Box bg="white">
      <Container size="lg" py={112}>
        <Text c="green" fw={700} fz={14} mb={4}>
          Team
        </Text>
        <Title order={2} c="dark" fw={800} mb="xs" fz={"h3"}>
          Get Quality Education
        </Title>
        <Text c="gray" fw={400} fz={14} lh={1.7} mb="xl" maw={440}>
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              shadow="sm"
              radius={20}
              p={0}
              miw={232}
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
              <Box
                ta="center"
                p={30}
                style={{ borderTop: "1px solid #E8E8E8" }}
              >
                <Text fw={700} c="dark" fz={14} mb={4}>
                  {member.name}
                </Text>
                <Text c="gray" fz={12} fw={400} mb="sm">
                  {member.profession}
                </Text>
                <Group justify="center" gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    radius="xl"
                    size="sm"
                  >
                    <IconBrandFacebook size={24} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    radius="xl"
                    size="sm"
                  >
                    <IconBrandInstagram size={24} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    radius="xl"
                    size="sm"
                  >
                    <IconBrandTwitter size={24} />
                  </ActionIcon>
                </Group>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
