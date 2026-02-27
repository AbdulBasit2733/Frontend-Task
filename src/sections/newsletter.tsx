import React, { useState } from "react";
import { Title, Text, TextInput, Button, Flex, Box } from "@mantine/core";
import { defaultData } from "../data/siteData";
import { useMediaQuery } from "@mantine/hooks";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
  return null;
}

const newsletterContent = defaultData.newsletterSectionContent;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleSubscribe = () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;
    setSubmitted(true);
    setEmail("");
    setEmailError(null);
  };

  return (
    <Flex
      w={"100%"}
      h={{ base: "auto", md: 549 }}
      bg="lightPink"
      justify={"center"}
      align={"center"}
      style={{
        flex: "none",
        order: 3,
        flexGrow: 0,
      }}
    >
      {/* CONTAINER */}
      <Flex
        w={{ base: "100%", xl: 1050 }}
        direction={"column"}
        align={"center"}
        py={{ base: 48, md: 112, lg: 160 }}
        px={{ base: "md", sm: "lg", md: 0 }}
      >
        {/* ROW */}
        <Flex
          direction={"column"}
          align={"center"}
          p={0}
          w={"100%"}
          maw={692}
          gap={{ base: 40, md: 60, lg: 80 }}
          style={{
            flex: "none",
            order: 0,
            flexGrow: 0,
          }}
        >
          <Flex
            w={"100%"}
            maw={692}
            direction={"column"}
            gap={10}
            align={"center"}
            justify={"center"}
          >
            <Title
              c={"green"}
              fw={700}
              fz={14}
              lh={"24px"}
              lts={"0.2px"}
              ta={"center"}
            >
              {newsletterContent.label}
            </Title>
            <Title
              c={"dark"}
              fw={700}
              fz={24}
              lh={"32px"}
              lts={"0.1px"}
              ta={"center"}
            >
              {newsletterContent.title}
            </Title>
            <Text
              c={"gray"}
              fw={600}
              fz={14}
              lh={"20px"}
              lts={"0.2px"}
              ta={"center"}
              maw={500}
              style={{
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {newsletterContent.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}

                  {index === 0 && <Box component="br" visibleFrom="md" />}

                  {index === 0 && <Box component="span" hiddenFrom="md"></Box>}
                </React.Fragment>
              ))}
            </Text>
          </Flex>
          {/* Input + Button row */}
          <Flex
            direction="row"
            justify="center"
            align="flex-start"
            gap={0}
            w="100%"
            maw={688}
            style={{ flex: "none", order: 1, flexGrow: 0 }}
          >
            {submitted ? (
              <Text c="green" fw={700} fz={14} pt={30}>
                You're subscribed! Check your inbox.
              </Text>
            ) : (
              <Flex
                direction={{ base: "column", sm: "row" }}
                align={{ base: "stretch", sm: "flex-start" }}
                w="100%"
                gap={{ base: 16, sm: 0 }}
              >
                <TextInput
                  placeholder={newsletterContent.placeholder}
                  fw={600}
                  fz={14}
                  value={email}
                  w="100%"
                  h={58}
                  onChange={(e) => handleEmailChange(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  error={emailError}
                  styles={{
                    input: {
                      borderRadius: isMobile ? "5px" : "5px 0 0 5px",
                      borderColor: emailError ? undefined : "#E6E6E6",
                      borderWidth: "1px",
                      backgroundColor: "#F9F9F9",
                      height: 58,
                      paddingLeft: 20,
                    },
                    error: { textAlign: "left" },
                  }}
                  style={{ flex: 1 }}
                />
                <Button
                  color="green"
                  h={58}
                  fw={600}
                  onClick={handleSubscribe}
                  fullWidth={false}
                  w={{ base: "100%", sm: 117 }}
                  style={{
                    borderRadius: isMobile ? "5px" : "0 5px 5px 0",
                    border: "1px solid #E6E6E6",
                    flexShrink: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text fz={14} fw={600}>
                    {newsletterContent.btnText}
                  </Text>
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
