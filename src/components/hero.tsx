import { Container, Grid, Title, Text, Button, Group, Box, Image } from "@mantine/core";
import heroImage from "../assets/hero-cover-1.png";

export default function Hero() {
  return (
    <Container size="xl" py={80}>
      <Grid align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text c="green" fw={600} fz="md" mb="xs">
            Welcome
          </Text>
          <Title order={1} c="dark" fz="58px" fw={800} lh="80px" mb="md">
            Best Learning Opportunities
          </Title>
          <Text c="gray" fz="20px" fw={400} lh="30px" mb="xl" maw={320}>
            Our goal is to make online education work for everyone
          </Text>
          <Group>
            <Button
              color="green"
              size="md"
              radius="5px"
              px="40px"
              py="15px"
              h="52px"
            >
              Join Us
            </Button>
            <Button
              variant="outline"
              color="green"
              size="md"
              radius="5px"
              px="40px"
              py="15px"
              h="52px"
            >
              Learn More
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box ta="center">
            <Image src={heroImage} alt="Student" radius="md" w="100%" />
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
