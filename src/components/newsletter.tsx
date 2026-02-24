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
    <Box bg="lightPink">
      <Container size="md" py={160}>
        <Box ta="center">
          <Text c="green" fw={700} fz={14} mb={4}>
            Newsletter
          </Text>
          <Title order={2} c="dark" fw={700} mb="xs" fz={24}>
            Watch our Courses
          </Title>
          <Text
            c="gray"
            id="newsletter-descrption"
            fz={14}
            lh={1.7}
            mb="xl"
            maw={600}
            mx="auto"
            fw={400}
          >
            Problems trying to resolve the conflict between <br />
            the two major realms of Classical physics: Newtonian mechanics
          </Text>
          <Group gap={0} justify="center" wrap="nowrap" pt={30}>
            <TextInput
              placeholder="Your Email"
              fw={400}
              fz={14}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              size="lg"
              bd={0}
              style={{ flex: 1 }}
            />
            <Button
              color="green"
              size="lg"
              fw={700}
              style={{ borderRadius: "0 8px 8px 0", flexShrink: 0 }}
            >
              <Text fz={14} fw={400}>
                Subscribe
              </Text>
            </Button>
          </Group>
        </Box>
      </Container>
    </Box>
  );
}
