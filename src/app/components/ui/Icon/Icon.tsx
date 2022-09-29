import cn from 'classnames';
import s from './Icon.module.css';
import iconList from '@app/components/ui/Icon/iconList';

interface IconProps {
  name:
    | 'heart'
    | 'menu'
    | 'logo'
    | 'user'
    | 'message'
    | 'location'
    | 'close'
    | 'star'
    | 'calendar'
    | 'eye'
    | 'hashtag'
    | 'home'
    | 'plusCircle'
    | 'search';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'logo';
  theme?: 'primary' | 'secondary' | 'silent' | 'star' | 'muted';
  onClick?: () => void;
  className?: 'bordered' | 'unbordered';
}

export const Icon = ({
  name,
  size = 'sm',
  theme = 'silent',
  onClick,
  className = 'unbordered',
}: IconProps) => {
  const IconTag = iconList[name];
  if (IconTag) {
    return (
      <div className={cn(s.root, s[size], s[theme], s[className])} onClick={onClick}>
        <IconTag />
      </div>
    );
  } else {
    return <svg width="0px" height="0px"></svg>;
  }
};
