import { useState } from 'react';
import { SideBarPane } from '@components/sidebar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      id={'side-bar'}
      className={'absolute left-0 top-0 min-h-screen h-full w-[18.75rem'}
    >
      <div className={'relative w-full h-full'}>
        <SideBarPane open={open} setOpen={setOpen} />

        <MenuButton setOpen={setOpen} />
      </div>
    </div>
  );
};

interface MenuButtonProps {
  setOpen: Setter<boolean>;
}
const MenuButton = ({ setOpen }: MenuButtonProps) => {
  return (
    <a onClick={() => setOpen((prev: boolean) => !prev)}>
      <MenuRoundedIcon
        id={'menu-button'}
        className={
          'absolute top-2 left-3 text-[40px] text-beige cursor-pointer'
        }
      />
    </a>
  );
};