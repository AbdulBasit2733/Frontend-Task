import {
  Box,
  Container,
  SimpleGrid,
  Title,
  Text,
  Group,
  ActionIcon,
  Image,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { defaultData } from "../../data/siteData";

const footerColumns = defaultData.footerSectionContent;
const footerBottom  = defaultData.footerBottomContent;

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <IconBrandInstagram size={20} />;
  if (platform === "twitter")   return <IconBrandTwitter size={20} />;
  if (platform === "youtube")   return <IconBrandYoutube size={20} />;
  return <IconBrandFacebook size={20} />;
}

export default function Footer() {
  return (
    <Box>
      {/* ══ DIV 1 — Columns ══════════════════════════════ */}
      <Box bg="white">
        <Container size="lg" pt={50} pb={50}>
          <SimpleGrid cols={{ base: 1, sm: 3, md: 5 }} spacing={0}>
            {footerColumns.map((col) => (
              <Box key={col.header}>

                {/* Column header */}
                <Title order={6} c="dark" fw={700} fz={16} mb="md">
                  {col.header}
                </Title>

                {/* Links */}
                {col.links.map((link, index) =>
                  col.isContact ? (
                    // ── Contact row (icon + text) ──
                    <Group
                      key={index}
                      gap={8}
                      mb="xs"
                      align={link.type === "address" ? "flex-start" : "center"}
                      wrap="nowrap"
                    >
                      {link.icon && (
                        <ActionIcon variant="white" style={{ flexShrink: 0 }}>
                          <Image
                            src={link.icon}
                            alt={link.type}
                            w={16}
                            h={16}
                            style={{ objectFit: "contain" }}
                          />
                        </ActionIcon>
                      )}
                      <Text
                        component="a"
                        href={link.href}
                        c="gray"
                        fz={12}
                        fw={700}
                        lh={1.5}
                        style={{ textDecoration: "none", flex: 1 }}
                      >
                        {link.title}
                      </Text>
                    </Group>
                  ) : (
                    // ── Plain link ──
                    <Text
                      key={index}
                      component="a"
                      href={link.href}
                      c="gray"
                      fz={14}
                      fw={700}
                      mb={6}
                      display="block"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      {link.title}
                    </Text>
                  )
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ══ DIV 2 — Bottom bar ═══════════════════════════ */}
      <Box bg="#FAFAFA" py={25}>
        <Container size="lg">
          <Group justify="space-between">

            {/* Copyright */}
            <Text c="gray" fz={14} fw={700}>
              {footerBottom.copyright}
            </Text>

            {/* Social icons */}
            <Group gap="xs">
              {footerBottom.socialLinks.map((link) => (
                <ActionIcon
                  key={link.platform}
                  variant="subtle"
                  color="green"
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon platform={link.platform} />
                </ActionIcon>
              ))}
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
