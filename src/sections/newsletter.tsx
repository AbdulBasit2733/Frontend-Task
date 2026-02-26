import { useState } from "react";
import {
  Box,
  Container,
  Title,
  Text,
  Group,
  TextInput,
  Button,
} from "@mantine/core";
import { defaultData } from "../data/siteData";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
  return null;
}

const newsletterContent = defaultData.newsletterSectionContent;

export default function Newsletter() {
  const [email, setEmail]           = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted]   = useState(false);

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
    <Box bg="lightPink">
      <Container size="lg" py={112}>
        <Box ta="center">

          <Text c="green" fw={700} fz={14} mb={4}>
            {newsletterContent.label}
          </Text>

          <Title order={2} c="dark" fw={700} mb="xs" fz={24}>
            {newsletterContent.title}
          </Title>

          <Text c="gray" fz={14} lh={1.7} mb="xl" maw={600} mx="auto" fw={400}>
            {newsletterContent.description}
          </Text>

          {/* ── Subscriber email input ── */}
          {submitted ? (
            <Text c="green" fw={700} fz={14} pt={30}>
              🎉 You're subscribed! Check your inbox.
            </Text>
          ) : (
            <Box pt={30}>
              <Group gap={0} justify="center" wrap="nowrap">
                <TextInput
                  placeholder={newsletterContent.placeholder}
                  fw={400}
                  fz={14}
                  value={email}
                  onChange={(e) => handleEmailChange(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  size="xl"
                  error={emailError}
                  styles={{
                    input: {
                      borderRadius: "8px 0 0 8px",
                      borderColor: emailError ? undefined : "#E6E6E6",
                      borderWidth: "1px",
                      backgroundColor: "#F9F9F9",
                    },
                    error: { textAlign: "left" },
                  }}
                  style={{ flex: 1 }}
                />
                <Button
                  color="green"
                  size="xl"
                  fw={700}
                  onClick={handleSubscribe}
                  style={{
                    borderRadius: "0 8px 8px 0",
                    flexShrink: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text fz={14} fw={400}>
                    {newsletterContent.btnText}
                  </Text>
                </Button>
              </Group>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
