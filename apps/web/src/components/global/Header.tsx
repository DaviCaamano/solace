import PersonPinIcon from '@mui/icons-material/PersonPin';
export const Header = () => {
  return (
    <div
      id={'header'}
      className={'w-full h-20  flex flex-col items-end justify-end bg-red'}
      // style={{ backgroundColor: 'red' }}
    >
      <PersonPinIcon />
    </div>
  );
};
