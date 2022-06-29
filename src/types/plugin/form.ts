export interface FormTemplate {
  sections: FormSection[];
}

// TODO Support multi-level nesting
export interface FormSection {
  name: string;
  items: FormItem[];
  display?: FormItemDisplay;
  layout?: FormSectionLayout;
  borderThreshold?: number;
}

export enum FormSectionLayout {
  TABS = 'TABS'
}

export type FormItem =
  | AlertFormItem
  | DefaultFormItem
  | InputFormItem
  | DynamicInputFormItem
  | CodeEditorFormItem
  | DropdownFormItem
  | DynamicDropdownFormItem
  | MetadataDropdownFormItem
  | FieldListFormItem
  | ConnectOAuthButtonFormItem
  | CustomComponentFormItem
  | RadioFormItem;

export enum FormComponentType {
  ALERT = 'ALERT',
  INPUT_TEXT = 'INPUT_TEXT',
  INPUT_AREA = 'INPUT_AREA',
  DYNAMIC_INPUT_TEXT = 'DYNAMIC_INPUT_TEXT',
  CODE_EDITOR = 'CODE_EDITOR',
  FIELD_LIST = 'FIELD_LIST',
  DYNAMIC_FIELD_LIST = 'DYNAMIC_FIELD_LIST',
  DROPDOWN = 'DROPDOWN',
  DYNAMIC_DROPDOWN = 'DYNAMIC_DROPDOWN',
  METADATA_DROPDOWN = 'METADATA_DROPDOWN',
  CHECKBOX = 'CHECKBOX',
  SWITCH = 'SWITCH',
  CONNECT_OAUTH_BUTTON = 'CONNECT_OAUTH_BUTTON',
  //TODO(alex): find a better name?
  CUSTOM_COMPONENT = 'CUSTOM_COMPONENT',
  RADIO = 'RADIO'
}

export enum DisplayUnsupportedState {
  // TODO(taha) We can potentially add mixed states
  // for when incompatibilty occurs due to a not yet
  // supported field vs a deprecated field
  HIDE = 'hide',
  DISABLE = 'disable'
}

export enum TooltipIconType {
  WARNING = 'warning',
  INFO = 'info'
}

export type FormItemTooltip = {
  markdownText: string;
  icon?: string;
  iconType?: TooltipIconType;
};

export interface BaseFormItem {
  name: string;
  label: string;
  // startVersion and endVersion are inclusive.
  // For example, {startVersion=1, endVersion=3} indicates that the field is valid at version 1 and version 2.
  startVersion: string;
  endVersion?: string;
  agentVersion?: string;
  display?: FormItemDisplay;
  initialValue?: InitialValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any[];
  style?: FormItemStyle;
  disabled?: boolean;
  disabledPairCount?: number;
  tooltip?: FormItemTooltip;
  singleLine?: boolean;
  displayUnsupported?: DisplayUnsupportedState;
  hidden?: boolean;
  triggerGetMetadata?: boolean;
  immutable?: boolean;
}

export type InitialValue = string | number | boolean | KVPair[];

// Shortcut to avoid creating a type for each component type
export interface DefaultFormItem extends BaseFormItem {
  componentType: Exclude<
    FormComponentType,
    | FormComponentType.ALERT
    | FormComponentType.CONNECT_OAUTH_BUTTON
    | FormComponentType.CUSTOM_COMPONENT
    | FormComponentType.INPUT_TEXT
    | FormComponentType.DYNAMIC_INPUT_TEXT
    | FormComponentType.DROPDOWN
    | FormComponentType.DYNAMIC_DROPDOWN
    | FormComponentType.METADATA_DROPDOWN
    | FormComponentType.CODE_EDITOR
    | FormComponentType.FIELD_LIST
    | FormComponentType.DYNAMIC_FIELD_LIST
    | FormComponentType.RADIO
  >;
  placeholder?: string;
}

export interface FormItemDisplay {
  show?: Record<string, string[]>;
}

export interface FormItemStyle {
  minHeight?: string;
}

export interface InputFormItem extends BaseFormItem {
  componentType: FormComponentType.INPUT_TEXT;
  placeholder?: string;
  dataType?: InputDataType;
}

export interface DynamicInputFormItem extends BaseFormItem {
  componentType: FormComponentType.DYNAMIC_INPUT_TEXT;
  placeholder?: string;
  dataType?: InputDataType;
  subtitle?: string;
}

export enum InputDataType {
  NUMBER = 'NUMBER',
  PASSWORD = 'PASSWORD'
}

export interface KVPair {
  key: string;
  value: string;
  editable?: boolean;
}

export interface FieldListFormItem extends BaseFormItem {
  componentType: FormComponentType.FIELD_LIST | FormComponentType.DYNAMIC_FIELD_LIST;
  secretsNames?: string[];
}

export interface CodeEditorFormItem extends BaseFormItem {
  componentType: FormComponentType.CODE_EDITOR;
  placeholder?: string;
  language: EditorLanguage;
}

export enum EditorLanguage {
  TEXT = 'TEXT',
  SQL = 'SQL',
  JSON = 'JSON',
  JAVASCRIPT = 'JAVASCRIPT',
  PYTHON = 'PYTHON'
}

export interface DropdownFormItem extends BaseFormItem {
  componentType: FormComponentType.DROPDOWN;
  options: DropdownOption[];
}

export interface AlertFormItem extends BaseFormItem {
  componentType: FormComponentType.ALERT;
  text: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  showIcon?: boolean;
}

export interface DynamicDropdownFormItem extends BaseFormItem {
  componentType: FormComponentType.DYNAMIC_DROPDOWN;
  fetchOptions: () => Promise<DropdownOption[]>;
  extraOptions?: Record<string, DropdownOption & { onClick: () => void }>;
}

export interface MetadataDropdownFormItem extends BaseFormItem {
  componentType: FormComponentType.METADATA_DROPDOWN;
  accessorPath: string;
  predicateAccessorPath?: string;
  dependencyFieldName?: string;
  childIteratorAccessor?: string;
  keyAccessor?: string;
  valueAccessor?: string;
  displayNameAccessor?: string;
}

export interface ConnectOAuthButtonFormItem extends BaseFormItem {
  componentType: FormComponentType.CONNECT_OAUTH_BUTTON;
  href: string;
  target: string;
  iconUrl?: string;
}

export interface CustomComponentFormItem extends BaseFormItem {
  componentType: FormComponentType.CUSTOM_COMPONENT;
  childComponentType: FormComponentType;
  childComponentsProperties: Record<string, string | boolean>;
}

export interface RadioFormItem extends BaseFormItem {
  componentType: FormComponentType.RADIO;
  options: DropdownOption[];
}

export interface DropdownOption {
  key: string;
  value: string;
  displayName?: string;
  parentKey?: string;
}
