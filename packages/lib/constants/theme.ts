import type { TCssVarsSchema } from '../types/css-vars';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * KEEP THIS FILE IN SYNC WITH `packages/ui/styles/theme.css`.
 *
 * PVD Sign / RITFGIA brand defaults — see `packages/assets/images/pvd/brand-colors.json`.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export const DEFAULT_BRAND_COLORS = {
  background: '#ffffff',
  foreground: '#585858',
  muted: '#f1f1f1',
  mutedForeground: '#585858',
  popover: '#ffffff',
  popoverForeground: '#585858',
  card: '#ffffff',
  cardBorder: '#e2e2e2',
  cardForeground: '#585858',
  fieldCard: '#f5f5f5',
  fieldCardBorder: '#b8b8b8',
  fieldCardForeground: '#585858',
  widget: '#f7f7f7',
  widgetForeground: '#585858',
  border: '#e2e2e2',
  input: '#e2e2e2',
  primary: '#d82828',
  primaryForeground: '#ffffff',
  secondary: '#b8b8b8',
  secondaryForeground: '#585858',
  accent: '#f1f1f1',
  accentForeground: '#585858',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  ring: '#d82828',
  warning: '#eab308',
  envelopeEditorBackground: '#f8f8f8',
} as const satisfies Record<keyof Omit<TCssVarsSchema, 'radius' | 'cardBorderTint'>, string>;

export const DEFAULT_BRAND_RADIUS = '0.375rem';
