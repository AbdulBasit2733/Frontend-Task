import { Box, Group, Button, Transition } from "@mantine/core";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useSiteData } from "../../context/site-data-context";

export default function EditModeBar() {
  const { isEditMode, toggleEditMode } = useSiteData();

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isEditMode ? "#252B42" : "transparent",
        pointerEvents: isEditMode ? "all" : "none",
        transition: "background 0.3s ease",
      }}
    >
      <Transition mounted={true} transition="slide-down" duration={300}>
        {(styles) => (
          <Group justify="start" px={24} py={10} style={styles}>
            <Button
              variant={isEditMode ? "filled" : "light"}
              color={isEditMode ? "green" : "dark"}
              radius="xl"
              size="sm"
              fw={700}
              onClick={toggleEditMode}
              style={{ pointerEvents: "all" }}
            >
              {isEditMode ? <IconEye size={16} /> : <IconEdit size={16} />}
            </Button>
          </Group>
        )}
      </Transition>
    </Box>
  );
}
