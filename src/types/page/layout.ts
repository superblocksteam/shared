export interface WidgetRowCols {
  leftColumn?: number;
  rightColumn?: number;
  // @type integer
  topRow: number;
  // @type integer
  bottomRow: number;
  // @type integer
  snapColumns?: number;
  // @type integer
  snapRows?: number;
  minHeight?: number; // Required to reduce the size of CanvasWidgets.
}

// TODO: Replace with better types
interface WidgetProps extends WidgetRowCols {
  type: string;
  widgetId: string;
  children?: WidgetProps[];
  detachFromLayout?: boolean;
  [key: string]: unknown;
}

export interface PageDSL extends WidgetProps {
  version: number;
}

export interface Layout {
  id: string;
  dsl: PageDSL;
  updated: string;

  // FIXME: Unused properties
  actionUpdates: Record<string, unknown>[];
  layoutOnLoadActions: Record<string, unknown>[];
  messages: Record<string, unknown>[];
  userPermissions: Record<string, unknown>[];
}
