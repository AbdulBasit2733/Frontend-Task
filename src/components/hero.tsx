import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Group,
  Box,
  Image,
} from "@mantine/core";
import heroImage from "../assets/hero-cover-1.png";

export default function Hero() {
  return (
    <Container size="lg" py={{ base: 48, md: 80 }}>
      <Grid align="center" gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text c="green" fw={700} fz={14} mb={10}>
            Welcome
          </Text>
          <Title
            order={1}
            c="dark"
            fw={800}
            mb="md"
            style={{ fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.15 }}
          >
            Best Learning
            <br />
            Opportunities
          </Title>
          <Text c="gray" fz={14} fw={400} lh="20px" mb="xl" maw={340}>
            Our goal is to make online education work for everyone
          </Text>
          <Group gap="md">
            <Button color="green" size="md" radius={5} px={40} h={52} fw={700}>
              Join Us
            </Button>
            <Button
              variant="outline"
              color="green"
              size="md"
              radius={5}
              px={40}
              h={52}
              fw={700}
            >
              Learn More
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box ta="center">
            <Image
              src={heroImage}
              alt="Student"
              w="100%"
              style={{ maxHeight: 480, objectFit: "contain" }}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
