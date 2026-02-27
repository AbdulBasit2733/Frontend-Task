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
  Flex,
  Image,
  Divider,
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
        left={59}
        style={{
          zIndex: 100,
        }}
      >
        <Flex
          w={{ base: "100%", xl: 1322 }}
          h="100%"
          mx="auto"
          px={{ base: "md", sm: "lg", md: "xl" }}
          direction="row"
          align="center"
          justify={{ base: "space-between", md: "space-around" }}
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
          <Flex
            direction={"row"}
            justify={"space-between"}
            visibleFrom="md"
            w={{ md: "auto", lg: 812 }}
            pr={{ md: 0, lg: 60 }}
            gap={{ md: 32, lg: 0 }}
          >
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
                py={15}
                fw={700}
                fz={14}
                style={{ letterSpacing: "0.2px" }}
                rightSection={
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_0_52)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 5C0 4.81059 0.079009 4.62895 0.219646 4.49502C0.360282 4.36109 0.551026 4.28584 0.749916 4.28584H9.43845L6.21831 1.22068C6.07749 1.08658 5.99838 0.904705 5.99838 0.715059C5.99838 0.525414 6.07749 0.343536 6.21831 0.209436C6.35912 0.0753365 6.5501 0 6.74925 0C6.94839 0 7.13937 0.0753365 7.28019 0.209436L11.7797 4.49438C11.8495 4.56072 11.9049 4.63952 11.9427 4.72629C11.9805 4.81305 12 4.90606 12 5C12 5.09394 11.9805 5.18695 11.9427 5.27371C11.9049 5.36048 11.8495 5.43928 11.7797 5.50562L7.28019 9.79056C7.13937 9.92466 6.94839 10 6.74925 10C6.5501 10 6.35912 9.92466 6.21831 9.79056C6.07749 9.65646 5.99838 9.47459 5.99838 9.28494C5.99838 9.0953 6.07749 8.91342 6.21831 8.77932L9.43845 5.71416H0.749916C0.551026 5.71416 0.360282 5.63892 0.219646 5.50499C0.079009 5.37106 0 5.18941 0 5Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_52">
                        <rect width="12" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
              >
                {secondaryButton.label}
              </Button>
            </Group>
          </Flex>
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
        </Flex>
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
          <Stack gap="xl" mt="sm" align="self-start">
            <NavLinkItems onNavigate={closeDrawer} />
          </Stack>
          <Divider my={30} />
          <Stack gap="lg">
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
