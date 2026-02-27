import { Title, Text, Card, Image, Box, ActionIcon, Flex } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { defaultData } from "../data/siteData";

import React from "react";
import { MemberSocialIcon } from "../components/common/social-icon";

const { label, title, description, teamMembers } =
  defaultData.teamSectionContent;

export default function Team() {
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 992px)");
  const slidesToScroll = isMobile ? 1 : isTablet ? 2 : 4;

  const slides = teamMembers.map((member) => (
    <Carousel.Slide key={member.id}>
      <Card
        shadow="sm"
        bdrs={20}
        p={0}
        maw={238}
        h={{ base: "auto", md: 375 }}
        mx="auto"
        style={{
          overflow: "hidden",
          boxShadow: "0px 13px 19px rgba(0, 0, 0, 0.07)",
          flex: "none",
          order: 0,
          alignSelf: "stretch",
          flexGrow: 0,
        }}
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

        <Flex
          h={144}
          ta="center"
          p={30}
          align={"center"}
          direction={"column"}
          gap={10}
        >
          <Text lts={"0.1px"} lh={"24px"} fw={700} c="dark" fz={16}>
            {member.name}
          </Text>
          <Text
            lts={"0.2px"}
            lh={"16px"}
            ta={"center"}
            component="p"
            c="gray"
            fz={12}
            fw={600}
          >
            {member.profession}
          </Text>
          <Flex direction={"row"} align={"center"} justify="center" gap="20px">
            {(member.links ?? []).length > 0 ? (
              member.links!.map((link, i) => (
                <ActionIcon
                  key={i}
                  variant="white"
                  color="green"
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MemberSocialIcon platform={link.platform} />
                </ActionIcon>
              ))
            ) : (
              <>
                <ActionIcon
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                >
                  <IconBrandFacebook size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                >
                  <IconBrandInstagram size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="green"
                  radius="xl"
                  size="sm"
                >
                  <IconBrandTwitter size={20} />
                </ActionIcon>
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Flex
      w={"100%"}
      h={{ base: "auto", md: 849 }}
      bg="white"
      justify={"center"}
      align={"center"}
    >
      <Flex
        w={{ base: "100%", xl: 1050 }}
        mah={827}
        direction={"column"}
        align={"center"}
        py={{ base: 60, md: 112 }}
        px={{ base: "md", sm: "lg", xl: 0 }}
        gap={{ base: 60, md: 112 }}
      >
        {/* ROW */}
        <Flex
          w="100%"
          maw={1044}
          direction={"column"}
          align={"flex-start"}
          p={0}
        >
          <Flex
            direction={"column"}
            align={"flex-start"}
            p={0}
            gap={10}
            w="100%"
            maw={691}
          >
            <Text c="green" fw={700} fz={14} lts={"0.2px"} lh={"24px"}>
              {label}
            </Text>

            <Title c="dark" fw={700} fz={24} lh={"32px"} lts={"0.1px"}>
              {title}
            </Title>

            <Text
              c="gray"
              maw={500}
              fw={600}
              fz={14}
              lh={"20px"}
              style={{ letterSpacing: "0.2px" }}
            >
              {description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}

                  {index === 0 && <Box component="br" visibleFrom="md" />}

                  {index === 0 && <Box component="span" hiddenFrom="md"></Box>}
                </React.Fragment>
              ))}
            </Text>
          </Flex>
        </Flex>
        {/* ROW */}
        <Flex w="100%" maw={1049} direction="column" align="stretch">
          <Carousel
            slideSize={{ base: "100%", sm: "50%", md: "25%" }}
            slideGap={{ base: "md", md: 30 }}
            emblaOptions={{ loop: true, align: "start", slidesToScroll }}
            withControls
            withIndicators
            nextControlIcon={<IconArrowRight size={16} />}
            previousControlIcon={<IconArrowLeft size={16} />}
            styles={{
              root: {
                maxWidth: "100%",
              },
              viewport: {
                paddingBottom: 20,
              },
              controls: {
                padding: "0 10px",
              },
              control: {
                backgroundColor: "white",
                border: "1px solid #E8E8E8",
                color: "green",
                boxShadow: "0px 13px 19px rgba(0, 0, 0, 0.07)",
                borderRadius: "20px",
              },
              indicator: {
                backgroundColor: "green",
                width: 8,
                height: 8,
                borderRadius: "50%",
              },
              container: {
                marginBottom: "40px",
              },
            }}
          >
            {/* User CARD */}
            {slides}
          </Carousel>
        </Flex>
      </Flex>
    </Flex>
  );
}
