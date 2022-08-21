import iconList from '@core/helpers/iconList';
import cn from 'classnames';
import s from './Icon.module.css';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'logo';
  theme?: 'primary' | 'secondary' | 'silent';
}

export const Icon = ({ name, size = 'sm', theme = 'silent' }: IconProps) => {
  // @ts-ignore
  const IconTag = iconList[name];
  if (IconTag) {
    return (
      <div className={cn(s.root, s[size], s[theme])}>
        <IconTag />
      </div>
    );
  } else {
    return <svg width="0px" height="0px"></svg>;
  }
};
