import {
  Group,
  Text,
  Button,
  Anchor,
  Container,
  Box,
  Drawer,
  Divider,
  ScrollArea,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronRight,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { defaultData } from "../../data/siteData";

const { brandName, navLinks, primaryButton, secondaryButton } =
  defaultData.navbarSectionContent;

export default function Navbar() {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const NavLinkItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <Anchor
          key={link.label}
          href={link.href}
          c="gray"
          fz={14}
          fw={600}
          underline="never"
          onClick={onNavigate}
        >
          {link.label}
        </Anchor>
      ))}
    </>
  );

  return (
    <Box style={{ borderBottom: "1px solid #f0f0f0" }}>
      <Container size="lg" py="md">
        <Group justify="space-between">

          {/* ── Logo ── */}
          <Text fw={700} fz={24} c="dark">
            {brandName}
          </Text>

          {/* ── Desktop nav links ── */}
          <Group gap={32} visibleFrom="md">
            <NavLinkItems />
          </Group>

          {/* ── Desktop: Login + CTA ── */}
          <Group gap="sm" visibleFrom="md">
            <Anchor
              href={primaryButton.href}
              c="green"
              fw={700}
              fz={14}
              underline="never"
            >
              {primaryButton.label}
            </Anchor>
            <Button
              component="a"
              href={secondaryButton.href}
              color="green"
              radius="md"
              px={20}
              h={40}
              fw={700}
              fz={14}
              rightSection={<IconChevronRight size={16} stroke={2.5} />}
            >
              {secondaryButton.label}
            </Button>
          </Group>

          {/* ── Mobile: Hamburger ── */}
          <ActionIcon
            hiddenFrom="md"
            variant="subtle"
            color="dark"
            size="lg"
            onClick={openDrawer}
            aria-label="Open navigation menu"
          >
            <IconMenu2 size={22} />
          </ActionIcon>
        </Group>
      </Container>

      {/* ── Mobile Drawer ── */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
        padding="md"
        title={
          <Text fw={700} fz={18} c="dark">
            {brandName}
          </Text>
        }
        closeButtonProps={{ icon: <IconX size={18} /> }}
        position="right"
        zIndex={1000}
      >
        <ScrollArea h="calc(100dvh - 80px)" mx="-md" px="md">
          <Stack gap="sm" mt="sm">
            <NavLinkItems onNavigate={closeDrawer} />
          </Stack>

          <Divider my="lg" />

          <Stack gap="sm">
            <Anchor
              href={primaryButton.href}
              c="green"
              fw={700}
              fz={15}
              underline="never"
              onClick={closeDrawer}
            >
              {primaryButton.label}
            </Anchor>
            <Button
              component="a"
              href={secondaryButton.href}
              color="green"
              radius="md"
              h={44}
              fw={700}
              fz={14}
              fullWidth
              rightSection={<IconChevronRight size={16} stroke={2.5} />}
              onClick={closeDrawer}
            >
              {secondaryButton.label}
            </Button>
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
