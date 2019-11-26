import { withNavigation, route } from 'wool/navigation';
import { column } from 'wool/ui';

import article from './article';
import home from './home';

import footer from './footer';
import header from './header';
import { rem } from './styles';

export default column(
  [rem(1)],
  [
    header,
    // withNavigation((state, cmd) => [['/home', home], [['/article', article]]]),
    withNavigation((state, cmd) => ({ '/home': home, '/article': article })),
    // withNavigation((state, cmd) => {
    //   case (state.url) {
    //     when '/home' -> return home;
    //     when ['/article', slug] -> return article(slug);
    //     when _ -> return text`Not found`;
    //   }
    // }),
    footer,
  ],
);
