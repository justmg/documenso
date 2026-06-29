import pvdLogoHorizontal from '@documenso/assets/images/pvd/logo-horizontal.png';
import type { ImgHTMLAttributes } from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

export const BrandingLogo = ({ alt = 'PVD Sign', ...props }: LogoProps) => {
  return <img alt={alt} src={pvdLogoHorizontal} {...props} />;
};
