import { Dispatch, SetStateAction } from 'react';

declare global {
  interface Setter<T> extends Dispatch<SetStateAction<T>> {}
}
