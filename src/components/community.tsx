import React from "react";
import {
  Box,
  Container,
  Grid,
  Title,
  Text,
  Card,
  Image,
  Group,
  Anchor,
  Stack,
  Badge,
} from "@mantine/core";
import user1 from "../assets/user-cover-1.png";
import user2 from "../assets/user-cover-2.png";
import user3 from "../assets/user-cover-3.png";
import user4 from "../assets/user-cover-4.png";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/instagram.svg";
import twitterIcon from "../assets/twitter.svg";
import "./team.css";

const members = [
  { name: "Julian Jameson", image: user1 },
  { name: "Julian Jameson", image: user2 },
  { name: "Julian Jameson", image: user3 },
  { name: "Julian Jameson", image: user4 },
];

const Team: React.FC = () => {
  return (
    <Box
      component="section"
      id="team"
      py={80}
      style={{ background: "#FFFFFF" }}
    >
      <Container size="xl">
        {/* Section Header */}
        <Box mb={48}>
          <Badge
            mb="sm"
            style={{
              background: "transparent",
              color: "#96BA7B",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              padding: 0,
              border: "none",
              textTransform: "uppercase",
            }}
          >
            Team
          </Badge>

          <Stack gap="sm">
            <Title
              order={2}
              id="team-title"
              style={{
                color: "#252B42",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              Get Quality Education
            </Title>

            <Text
              id="team-description"
              style={{
                color: "#737373",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.8,
                maxWidth: 480,
              }}
            >
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </Text>
          </Stack>
        </Box>

        {/* Member Cards */}
        <Grid gutter="lg" id="team-grid">
          {members.map((member, idx) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={idx}>
              <Card
                id={`team-card-${idx}`}
                padding={0}
                radius="md"
                className="team-card"
                style={{
                  border: "1px solid #E8E8E8",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s, transform 0.25s",
                }}
              >
                {/* Member Photo */}
                <Box style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="team-card-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </Box>

                {/* Info */}
                <Box
                  p="md"
                  style={{
                    borderTop: "1px solid #E8E8E8",
                    textAlign: "center",
                  }}
                >
                  <Text
                    fw={700}
                    mb="sm"
                    style={{
                      color: "#252B42",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    {member.name}
                  </Text>

                  {/* Social Icons */}
                  <Group justify="center" gap="md">
                    <Anchor
                      href="https://facebook.com"
                      target="_blank"
                      id={`fb-link-${idx}`}
                      className="social-icon-wrap"
                    >
                      <Image
                        src={facebookIcon}
                        alt="Facebook"
                        w={16}
                        h={16}
                        className="social-icon"
                      />
                    </Anchor>
                    <Anchor
                      href="https://instagram.com"
                      target="_blank"
                      id={`ig-link-${idx}`}
                      className="social-icon-wrap"
                    >
                      <Image
                        src={instagramIcon}
                        alt="Instagram"
                        w={16}
                        h={16}
                        className="social-icon"
                      />
                    </Anchor>
                    <Anchor
                      href="https://twitter.com"
                      target="_blank"
                      id={`tw-link-${idx}`}
                      className="social-icon-wrap"
                    >
                      <Image
                        src={twitterIcon}
                        alt="Twitter"
                        w={16}
                        h={16}
                        className="social-icon"
                      />
                    </Anchor>
                  </Group>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
