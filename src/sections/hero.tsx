import { Flex, Title, Text, Button, Group, Box, Image } from "@mantine/core";
import { defaultData } from "../data/siteData";
const heroContent = defaultData.heroSectionContent;
const titleLines = heroContent.title.split("\n");

export default function Hero() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        position: "relative",
      }}
      w="100%"
      h={{ base: "auto", md: 682 }}
      px={{ base: "md", sm: "lg", md: 0 }}
    >
      <Flex
        mx={"auto"}
        w={{ base: "100%", xl: 1439 }}
        direction={{ base: "column", md: "row" }}
        justify={"space-between"}
        align={{ base: "flex-start", md: "center" }}
        left={0}
        py={{ base: "xl", md: 0 }}
      >
        <Flex
          direction={"column"}
          justify={"center"}
          align={"flex-start"}
          gap={30}
          pl={{ base: 5, md: 40, lg: 85 }}
          w={{ base: "100%", md: "50%" }}
        >
          <Text
            fw={700}
            fz={16}
            lh="24px"
            style={{ letterSpacing: "0.1px" }}
            c="green"
          >
            {heroContent.label}
          </Text>

          <Title
            order={1}
            fw={700}
            fz={{ base: 36, md: 58 }}
            lh={{ base: "48px", md: "80px" }}
            style={{ letterSpacing: "0.2px" }}
            c="dark"
            maw={{ base: "100%", md: 542 }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </Title>

          <Text
            component="h4"
            fw={600}
            className="hero-description"
            fz={20}
            lh="30px"
            style={{ letterSpacing: 0.2 }}
            c="gray"
            maw={{ base: "100%", md: 338 }}
          >
            {heroContent.description}
          </Text>

          <Group gap={10} wrap="wrap">
            <Button
              h={52}
              bg="green"
              radius={5}
              px={40}
              py={15}
              fw={700}
              fz={14}
              style={{ letterSpacing: "0.2px" }}
            >
              {heroContent.primaryBtn}
            </Button>
            <Button
              variant="outline"
              color="green"
              radius={5}
              px={40}
              h={52}
              fw={700}
              fz={14}
              style={{ letterSpacing: "0.2px" }}
            >
              {heroContent.secondaryBtn}
            </Button>
          </Group>
        </Flex>
        <Box
          pos={{ base: "relative", md: "absolute" }}
          right={{ base: "unset", md: 0, lg: 0, xl: 0, "2xl":"unset", }}
          top={{ base: "unset", md: 0 }}
          h={{ base: 300, sm: 600, md: "100%" }}
          w={{ base: "100%", md: "50%" }}
        >
          <Image
            src={heroContent.image}
            alt="Student"
            h="100%"
            fit="contain"
            hiddenFrom="md"
            style={{ objectPosition: "center" }}
          />
          <Image
            src={heroContent.image}
            alt="Student"
            h="100%"
            fit="contain"
            visibleFrom="md"
            style={{ objectPosition: "right center" }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
