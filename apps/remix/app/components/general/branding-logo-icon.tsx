import pvdLogoIcon from '@documenso/assets/images/pvd/logo-icon.png';
import type { ImgHTMLAttributes } from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

export const BrandingLogoIcon = ({ alt = 'PVD Sign', ...props }: LogoProps) => {
  return <img alt={alt} src={pvdLogoIcon} {...props} />;
};
