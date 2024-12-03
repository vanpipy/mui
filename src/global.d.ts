/* eslint-disable */
import type { } from 'piral-menu';

declare module 'piral-menu/lib/types' {
  interface PiralCustomMenuSettings {
    code?: string;
    key: string;
    label: string;
    priority?: number;
    icon?: string;
  }
}
