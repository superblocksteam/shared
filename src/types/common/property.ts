export interface Property {
  key?: string;
  value?: string;
  editable?: boolean;
  internal?: boolean;
  description?: string;
  mandatory?: boolean;
  type?: string;
  defaultValue?: string;
  minRange?: string;
  maxRange?: string;
  valueOptions?: string[];
}
