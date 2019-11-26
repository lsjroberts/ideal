import { rgba, white } from 'wool/colors';
import { Background, Border, Font, column, el, spacing, text } from 'wool/ui';

import { colors, rem } from './styles';

export default column(
  [],
  [
    column(
      [
        Background.color(colors.primary),
        Border.innerShadow({
          offset: [0, 8],
          blur: 8,
          size: 8,
          color: rgba(0, 0, 0, 0.3),
        }),
        Border.innerShadow({
          offset: [0, -8],
          blur: 8,
          size: 8,
          color: rgba(0, 0, 0, 0.3),
        }),
        Font.center(),
        Font.color(white),
        spacing(rem(0.5)),
      ],
      [
        el(
          [
            rem(3.5),
            Font.extraBold(),
            Font.shadow({
              offset: [0, 1],
              blur: 3,
              color: rgba(0, 0, 0, 0.3),
            }),
          ],
          text`conduit`,
        ),
        el([rem(1.5)], text`A place to share your knowledge.`),
      ],
    ),
  ],
);
