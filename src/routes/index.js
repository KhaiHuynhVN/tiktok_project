// Pages
import pages from '~/page';
// Layouts
import { HeaderOnly, FloatLayout } from '~/layouts';
// routes config
import * as config from '~/config';

const publicRoutes = [
   { path: config.routes.home, component: pages.Home },
   { path: config.routes.following, component: pages.Following },
   { path: config.routes.profile, component: pages.Profile },
   { path: config.routes.upload, component: pages.Upload, layout: HeaderOnly },
   { path: config.routes.search, component: pages.Search, layout: FloatLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
