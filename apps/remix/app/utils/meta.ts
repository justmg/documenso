import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description =
    'PVD Sign — internal document signing for Rhode Island T. F. Green International Airport.';

  return [
    {
      title: title ? `${i18n._(title)} - PVD Sign` : 'PVD Sign',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
    {
      property: 'og:title',
      content: 'PVD Sign',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/android-chrome-512x512.png`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ];
};
