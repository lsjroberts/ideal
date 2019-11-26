import { hex } from 'wool/colors';
import { linear } from 'wool/scale';
import { Font } from 'wool/ui';

export const fontSize = linear(16);
export const rem = r => Font.size(r);

export const colors = {
  primary: hex('5CB85C'),
};
