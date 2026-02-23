import {
  Box,
  Container,
  Title,
  Text,
  Group,
  TextInput,
  Button,
} from "@mantine/core";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <Box bg="lightPink" py={80}>
      <Container size="sm" ta="center">
        <Text c="green" fw={600} fz="sm" mb={4}>
          Newsletter
        </Text>
        <Title order={2} c="dark" fw={800} mb="xs">
          Watch our Courses
        </Title>
        <Text c="gray" fz="sm" mb="xl" maw={400} mx="auto">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </Text>
        <Group gap={0} justify="center">
          <TextInput
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            radius="md"
            size="md"
            style={{ flex: 1, maxWidth: 360 }}
            styles={{
              input: { borderRadius: "8px 0 0 8px", borderRight: "none" },
            }}
          />
          <Button
            color="green"
            size="md"
            style={{ borderRadius: "0 8px 8px 0" }}
          >
            Subscribe
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
