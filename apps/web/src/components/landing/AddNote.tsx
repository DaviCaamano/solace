import colors from '@styles/tailwind/colors';

export const AddNote = () => {

  return (
    <div
      id={'add-note'}
      className={
        'flex flex-col md:flex-row justify-center items-center pb-[10%]'
      }
    >
      <div
        className={`${editorDimensions} rounded-2xl bg-beige overflow-hidden w-full h-[100px]`}
      >
        <div
          className={'w-full h-full'}
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 28px, ${colors.mug} 28px, ${colors.mug} 30px, transparent 26px)`,
            backgroundSize: '100% 2rem',
            backgroundAttachment: 'local',
          }}
        >
          <textarea
            className={'w-full h-full bg-beige pl-8 pt-8 pr-4 pb-4 scrollbar-thin'}
            style={{
              backgroundImage: `linear-gradient(${colors['brown-dark']} .1em, transparent .1em), linear-gradient(90deg, transparent 28px, ${colors.mug} 28px, ${colors.mug} 30px, transparent 26px)`,
              backgroundSize: '100% 2rem',
              backgroundAttachment: 'local',
              lineHeight: '2rem',
              fontSize: '1.5rem',
            }}
            value={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dui felis. Vivamus vitae pharetra nisl, eget fringilla elit. Ut nec est sapien. Aliquam dignissim velit sed nunc imperdiet cursus. Proin arcu diam, tempus ac vehicula a, dictum quis nibh. Maecenas vitae quam ac mi venenatis vulputate. Suspendisse fermentum suscipit eros, ac ultricies leo sagittis quis. Nunc sollicitudin lorem eget eros eleifend facilisis. Quisque bibendum sem at bibendum suscipit. Nam id tellus mi. Mauris vestibulum, eros ac ultrices lacinia, justo est faucibus ipsum, sed sollicitudin sapien odio sed est. In massa ipsum, bibendum quis lorem et, volutpat ultricies nisi. Maecenas scelerisque sodales ipsum a hendreritLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dui felis. Vivamus vitae pharetra nisl, eget fringilla elit. Ut nec est sapien. Aliquam dignissim velit sed nunc imperdiet cursus. Proin arcu diam, tempus ac vehicula a, dictum quis nibh. Maecenas vitae quam ac mi venenatis vulputate. Suspendisse fermentum suscipit eros, ac ultricies leo sagittis quis. Nunc sollicitudin lorem eget eros eleifend facilisis. Quisque bibendum sem at bibendum suscipit. Nam id tellus mi. Mauris vestibulum, eros ac ultrices lacinia, justo est faucibus ipsum, sed sollicitudin sapien odio sed est. In massa ipsum, bibendum quis lorem et, volutpat ultricies nisi. Maecenas scelerisque sodales ipsum a hendrerit.'
            }
          />
        </div>
      </div>
    </div>
  );
};

const editorDimensions =
  'w-[20rem] h-[20rem] sm:w-[31rem] sm:h-[31rem] lg:w-[46rem] lg:h-[46rem]';
