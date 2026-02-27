import { Box, Text, ActionIcon, Anchor, Flex } from "@mantine/core";
import { defaultData } from "../../data/siteData";
import { ContactIcon, MemberSocialIcon } from "./social-icon";
const footerColumns = defaultData.footerSectionContent;
const footerBottom = defaultData.footerBottomContent;

export default function Footer() {
  return (
    <Box w="100%" bg="#FAFAFA">
      {/* ══ DIV 1 — Columns ══════════════════════════════ */}
      <Box w="100%" bg="white">
        <Flex
          w={{ base: "100%", xl: 1050 }}
          mx="auto"
          direction="column"
          align="flex-start"
          py={50}
          px={{ base: "md", sm: "lg", xl: 0 }}
        >
          {/* ROW */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "flex-start", md: "flex-start" }}
            wrap="wrap"
            gap={{ base: 32, md: 30 }}
            w={"100%"}
          >
            {footerColumns.map((fc, index) => (
              <Flex
                key={index}
                direction="column"
                align="flex-start"
                gap={20}
                w={{
                  base: "100%",
                  sm: fc.isContact ? "100%" : "calc(25% - 24px)",
                  lg: fc.isContact ? 322 : 152,
                }}
                style={{ flex: "none", flexGrow: 0 }}
              >
                <Text fw={700} fz={16} lh="24px" lts={"0.1px"} c="dark">
                  {fc.header}
                </Text>

                <Flex direction="column" align="flex-start" gap={10}>
                  {fc.links.map((link, i) =>
                    fc.isContact ? (
                      <Flex
                        key={i}
                        direction="row"
                        align="center"
                        gap={10}
                        style={{ flex: "none", flexGrow: 0 }}
                      >
                        <ContactIcon type={link.type} />
                        <Anchor
                          href={link.href}
                          fw={700}
                          fz={14}
                          lh="24px"
                          c="gray"
                          underline="never"
                          lts={"0.2px"}
                        >
                          {link.title}
                        </Anchor>
                      </Flex>
                    ) : (
                      <Anchor
                        key={i}
                        href={link.href}
                        fw={700}
                        fz={14}
                        lh="24px"
                        c="#737373"
                        underline="never"
                        style={{ letterSpacing: "0.2px" }}
                      >
                        {link.title}
                      </Anchor>
                    ),
                  )}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
      {/* ══ DIV 2 — Columns ══════════════════════════════ */}
      <Box w="100%" bg="#FAFAFA">
        <Flex
          w={{ base: "100%", xl: 1050 }}
          mx="auto"
          direction="column"
          align="center"
          py={25}
          px={{ base: "xl", sm: "lg", xl: 0 }}
        >
          <Flex
            direction={{ base: "column", sm: "row" }}
            align="center"
            justify={{ base: "center", sm: "space-between" }}
            gap={{ base: 20, sm: 0 }}
            w="100%"
          >
            <Text
              fw={700}
              fz={14}
              lh="24px"
              c="#737373"
              ta={{ base: "center", sm: "left" }}
              style={{
                letterSpacing: "0.2px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {footerBottom.copyright}
            </Text>

            {/* Social Icons */}
            <Flex direction="row" justify="center" align="center" gap={20}>
              {footerBottom.socialLinks.map((link) => (
                <ActionIcon
                  key={link.platform}
                  variant="transparent"
                  color="#96BB7C"
                  size={24}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MemberSocialIcon platform={link.platform} />
                </ActionIcon>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
