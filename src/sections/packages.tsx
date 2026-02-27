import { Title, Box, Flex, Anchor, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { defaultData } from "../data/siteData";
import React from "react";
import compactArrow from "../assets/compact-arrow.svg";

const { title, description, anchorContent, packages } =
  defaultData.packageSectionContent;

export default function Packages() {
  const { hovered, ref: anchorRef } = useHover<HTMLAnchorElement>();

  return (
    <Box w="100%" bg="white">
      <Flex
        w={{ base: "100%", xl: 1050 }}
        mx="auto" // ✅ Center it
        px={{ base: "xl", md: "lg", xl: 0 }}
        py={{ base: 60, md: 112 }}
        direction="column"
        align="center"
        justify="center"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={{ base: 48, md: 30 }}
          w="100%"
        >
          {/* Left col */}
          <Flex
            direction="column"
            align="flex-start"
            gap={35}
            flex={1}
            maw={507}
          >
            <Box w={94} h={7} bg="#E74040" style={{ borderRadius: 2 }} />

            <Title
              order={2}
              c="dark"
              fw={700}
              fz={{ base: 28, md: 40 }}
              lh={{ base: "38px", md: "50px" }}
            >
              {title}
            </Title>

            <Text
              c="gray"
              fz={14}
              fw={600}
              lh="20px"
              maw={360}
              style={{ letterSpacing: "0.2px" }}
            >
              {description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index === 0 && <Box component="br" visibleFrom="md" />}
                  {index === 0 && (
                    <Box component="span" hiddenFrom="md">
                      {" "}
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Text>

            <Anchor
              ref={anchorRef}
              href={anchorContent.href}
              c="green"
              fw={700}
              fz={14}
              lh="24px"
              underline="never"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                letterSpacing: "0.2px",
              }}
            >
              {anchorContent.label}
              <img
                src={compactArrow}
                alt=""
                style={{
                  width: 9,
                  height: 16,
                  transform: hovered ? "translateX(5px)" : "translateX(0px)",
                  transition: "transform 200ms ease",
                }}
              />
            </Anchor>
          </Flex>

          {/* Right col (Cards) */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            align="stretch"
            gap={30}
            flex={1}
            maw={508}
            wrap="wrap"
          >
            {packages.map((pkg) => (
              <Flex
                key={pkg.id}
                direction="column"
                align="flex-start"
                gap={20}
                py={35}
                px={{ base: 24, md: 40 }}
                flex={1}
                maw={{ sm: "calc(50% - 15px)", lg: 249 }}
                style={{
                  background: "white",
                  boxShadow: "0px 13px 19px rgba(0, 0, 0, 0.07)",
                  borderRadius: 10,
                }}
              >
                <Flex
                  justify="center"
                  align="center"
                  bg="green"
                  w={70}
                  h={76}
                  style={{ borderRadius: 10 }}
                >
                  <img
                    src={pkg.icon}
                    alt={pkg.title}
                    style={{ width: 32, height: 32, objectFit: "contain" }}
                  />
                </Flex>

                <Title
                  order={5}
                  fw={700}
                  fz={16}
                  lh="24px"
                  c="dark"
                  style={{ letterSpacing: "0.1px" }}
                >
                  {pkg.title}
                </Title>

                <Box w={50} h={2} bg="#E74040" style={{ flexShrink: 0 }} />

                <Text
                  fw={600}
                  fz={14}
                  lh="20px"
                  c="gray"
                  style={{ letterSpacing: "0.2px" }}
                >
                  {pkg.description}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
