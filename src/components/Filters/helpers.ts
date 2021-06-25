export type CheckboxData = {
  contentId: string;
  completed: boolean;
  label: string;
};

export type FilterList = {
  id: string;
  active: boolean;
  title: string;
  content: CheckboxData[] | React.ReactNode;
};

export function isContentArray(
  array: CheckboxData[] | React.ReactNode
): array is CheckboxData[] {
  if (!Array.isArray(array)) {
    return false;
  }

  if (array.length === 0) {
    return true;
  }

  return Object.prototype.hasOwnProperty.call(
    array[0] as CheckboxData,
    'contentId'
  );
}
