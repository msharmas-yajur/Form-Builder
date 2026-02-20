
export enum ControlType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  SECTION = 'SECTION',
  GROUP = 'GROUP'
}

export interface FormItem {
  id: string;
  label: string;
  type: ControlType;
  required?: boolean;
  options?: string[];
  loincCode?: string;
  description?: string;
  placeholder?: string;
  items?: FormItem[]; // For nested sections/groups
  index?: string;     // e.g., "1.", "I.", "a."
}

export interface FormDefinition {
  id?: string;
  title: string;
  version: string;
  publisher: string;
  items: FormItem[];
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
}

export type ViewMode = 'editor' | 'preview' | 'ai-designer' | 'analytics';
