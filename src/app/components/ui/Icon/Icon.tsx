import iconList from 'src/lib/iconList';
import cn from 'classnames';
import s from './Icon.module.css';

interface IconProps {
  name: 'heart' | 'menu' | 'logo' | 'user' | 'message' | 'location' | 'close';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'logo';
  theme?: 'primary' | 'secondary' | 'silent';
  onClick?: () => void;
}

export const Icon = ({ name, size = 'sm', theme = 'silent', onClick }: IconProps) => {
  const IconTag = iconList[name];
  if (IconTag) {
    return (
      <span className={cn(s.root, s[size], s[theme])} onClick={onClick}>
        <IconTag />
      </span>
    );
  } else {
    return <svg width="0px" height="0px"></svg>;
  }
};
