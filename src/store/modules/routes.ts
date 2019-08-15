function loadComp(component: string) {
   return () => import(`../../views/${component}.vue`);
}
const routes = {
    state: {
        routes: {
            pages: [
                // tslint:disable-next-line:max-line-length
                { path: '/event/:view/:id', component: loadComp('Layout'),
                    children: [
                         // tslint:disable-next-line:max-line-length
                        {path: '/event/:view/:id', name: 'event', component: loadComp('pages/Event'), meta: {regAuth: false, pageName: 'event', title: 'Событие', icon: 'chart-bar', noCache: true }},
                    ],
                },
                // tslint:disable-next-line:max-line-length
                { path: '/event/:view/:id/:location', component: loadComp('Layout'),
                    children: [
                         // tslint:disable-next-line:max-line-length
                        {path: '/event/:view/:id/:location', name: 'event', component: loadComp('pages/Event'), meta: {regAuth: false, pageName: 'event', title: 'Событие', icon: 'chart-bar', noCache: true }},
                    ],
                },
                // tslint:disable-next-line:max-line-length
                { path: '/events/:id', component: loadComp('Layout'),
                    children: [
                         // tslint:disable-next-line:max-line-length
                        {path: '/events/:id', name: 'events', component: loadComp('pages/Events'), meta: {regAuth: false, pageName: 'events', title: 'События', icon: 'chart-bar', noCache: true }},
                    ],
                },
                // tslint:disable-next-line:max-line-length
                { path: '/clubs', component: loadComp('Layout'),
                    children: [
                         // tslint:disable-next-line:max-line-length
                        {path: '/clubs', name: 'clubs', component: loadComp('pages/Clubs'), meta: {regAuth: false, pageName: 'clubs', title: 'Клубы', icon: 'chart-bar', noCache: true }},
                    ],
                },
            ],
        },
    },
};

export default routes;
