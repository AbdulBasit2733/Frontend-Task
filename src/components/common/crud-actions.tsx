import { Group, ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
};

export default function CrudActions({ onEdit, onDelete, onAdd }: Props) {
  return (
    <Group gap={4}>
      {onAdd && (
        <Tooltip label="Add" withArrow>
          <ActionIcon
            variant="light"
            color="green"
            radius="xl"
            size="sm"
            onClick={onAdd}
          >
            <IconPlus size={14} />
          </ActionIcon>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip label="Edit" withArrow>
          <ActionIcon
            variant="light"
            color="blue"
            radius="xl"
            size="sm"
            onClick={onEdit}
          >
            <IconEdit size={14} />
          </ActionIcon>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip label="Remove" withArrow>
          <ActionIcon
            variant="light"
            color="red"
            radius="xl"
            size="sm"
            onClick={onDelete}
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
}
