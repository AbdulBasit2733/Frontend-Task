import { useState } from "react";
import {
  Box,
  Container,
  Title,
  Text,
  Group,
  TextInput,
  Button,
  Modal,
  Textarea,
  Stack,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useSiteData } from "../../context/site-data-context";
import type { NewsletterContent } from "../../types/types";

// ── Validation helpers ────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
  return null;
}

type FormErrors = Partial<Record<keyof NewsletterContent, string>>;

function validateForm(form: NewsletterContent): FormErrors {
  const errors: FormErrors = {};
  if (!form.label.trim()) errors.label = "Label is required";
  if (!form.title.trim()) errors.title = "Title is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.placeholder.trim())
    errors.placeholder = "Placeholder text is required";
  if (!form.btnText.trim()) errors.btnText = "Button text is required";
  return errors;
}

export default function Newsletter() {
  const { data, isEditMode, updateNewsletterContent } = useSiteData();
  const newsletterContent = data.newsletterSectionContent;

  // ── Subscriber email state ────────────────────────────
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ── Edit modal state ──────────────────────────────────
  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState<NewsletterContent>({ ...newsletterContent });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // ── Subscriber email handlers ─────────────────────────
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

  // ── Edit modal handlers ───────────────────────────────
  const handleChange = (field: keyof NewsletterContent, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));

    if (formErrors[field]) {
      setFormErrors((p) => ({ ...p, [field]: undefined }));
    }
  };

  const handleOpen = () => {
    setForm({ ...newsletterContent });
    setFormErrors({});
    open();
  };

  const handleClose = () => {
    setFormErrors({});
    close();
  };

  const handleSave = () => {
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    updateNewsletterContent(form);
    close();
  };

  return (
    <Box bg="lightPink">
      <Container size="lg" py={112}>
        <Box ta="center">
          <Group justify="center" align="center" gap="xs" mb={4}>
            <Text c="green" fw={700} fz={14}>
              {newsletterContent.label}
            </Text>
            {isEditMode && (
              <Tooltip label="Edit Newsletter" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  radius="xl"
                  size="sm"
                  onClick={handleOpen}
                >
                  <IconEdit size={14} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>

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
                    error: {
                      textAlign: "left",
                    },
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

      {/* ── Edit Modal ── */}
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Edit Newsletter Section"
        centered
        size="sm"
      >
        <Stack gap="sm">
          <TextInput
            label="Label (above title)"
            placeholder="Newsletter"
            value={form.label}
            error={formErrors.label}
            onChange={(e) => handleChange("label", e.currentTarget.value)}
          />
          <TextInput
            label="Title"
            placeholder="Watch our Courses"
            value={form.title}
            error={formErrors.title}
            onChange={(e) => handleChange("title", e.currentTarget.value)}
          />
          <Textarea
            label="Description"
            placeholder="Problems trying to resolve..."
            autosize
            minRows={2}
            value={form.description}
            error={formErrors.description}
            onChange={(e) => handleChange("description", e.currentTarget.value)}
          />
          <TextInput
            label="Input Placeholder"
            placeholder="Your Email"
            value={form.placeholder}
            error={formErrors.placeholder}
            onChange={(e) => handleChange("placeholder", e.currentTarget.value)}
          />
          <TextInput
            label="Button Text"
            placeholder="Subscribe"
            value={form.btnText}
            error={formErrors.btnText} // ✅
            onChange={(e) => handleChange("btnText", e.currentTarget.value)}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSave}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
