import {
  Group,
  Text,
  Button,
  Anchor,
  Box,
  Drawer,
  ScrollArea,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight, IconMenu2, IconX } from "@tabler/icons-react";
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
          fw={700}
          lh="24px"
          style={{ letterSpacing: "0.2px", textAlign: "center" }}
          underline="never"
          onClick={onNavigate}
        >
          {link.label}
        </Anchor>
      ))}
    </>
  );

  return (
    <>
      <Box
        w="100%"
        h={{ base: 64, sm: 72, md: 91 }}
        pos="sticky"
        top={0}
        style={{
          zIndex: 100,
        }}
      >
        <Box
          w={{ base: "100%", xl: 1322 }}
          h="100%"
          mx="auto"
          px={{ base: "md", sm: "lg", md: "xl" }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            fw={700}
            fz={{ base: 18, md: 24 }}
            lh="32px"
            style={{ letterSpacing: "0.1px" }}
            c="dark"
          >
            {brandName}
          </Text>

          <Group gap={21} visibleFrom="md">
            <NavLinkItems />
          </Group>

          <Group gap={45} visibleFrom="md">
            <Anchor
              href={primaryButton.href}
              c="green"
              fw={700}
              fz={14}
              lh="22px"
              style={{ letterSpacing: "0.2px", textAlign: "right" }}
              underline="never"
            >
              {primaryButton.label}
            </Anchor>

            <Button
              component="a"
              href={secondaryButton.href}
              bg="green"
              radius={5}
              px={25}
              h={52}
              fw={700}
              fz={14}
              style={{ letterSpacing: "0.2px" }}
              rightSection={<IconChevronRight size={12} stroke={2.5} />}
            >
              {secondaryButton.label}
            </Button>
          </Group>
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
        </Box>
      </Box>
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
        zIndex={200}
      >
        <ScrollArea h="calc(100dvh - 80px)" mx="-md" px="md">
          <Stack gap="sm" mt="sm" align="self-start">
            <NavLinkItems onNavigate={closeDrawer} />
          </Stack>
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
              bg="green"
              radius={5}
              h={52}
              fw={700}
              fz={14}
              fullWidth
              rightSection={<IconChevronRight size={12} stroke={2.5} />}
              onClick={closeDrawer}
            >
              {secondaryButton.label}
            </Button>
          </Stack>
        </ScrollArea>
      </Drawer>
    </>
  );
}
