import type React from 'react';
import type { HTMLAttributes } from 'react';

export type DocumentShareButtonProps = HTMLAttributes<HTMLButtonElement> & {
  token?: string;
  documentId: number;
  trigger?: (_props: { loading: boolean; disabled: boolean }) => React.ReactNode;
};

/** Disabled for PVD Sign — social sharing / Documenso promotion is not used. */
export const DocumentShareButton = (_props: DocumentShareButtonProps) => {
  return null;
};
