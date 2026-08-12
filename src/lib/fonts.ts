import localFont from 'next/font/local';

export const fraunces = localFont({
  src: '../fonts/Fraunces-Variable.ttf',
  variable: '--font-display',
  display: 'swap',
  weight: '300 900',
});

export const publicSans = localFont({
  src: [
    { path: '../fonts/PublicSans-Variable.ttf', style: 'normal' },
    { path: '../fonts/PublicSans-Italic-Variable.ttf', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
  weight: '100 900',
});

export const plexMono = localFont({
  src: [
    { path: '../fonts/IBMPlexMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/IBMPlexMono-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/IBMPlexMono-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});
