(window.webpackJsonp = window.webpackJsonp || []).push([
    [2],
    {
        'ENJ/': function(e, t, n) {
            'use strict';
            n.r(t),
                n.d(t, 'RootPageTemplate', function() {
                    return r;
                });
            var a = n('q1tI'),
                o = n('vOnD'),
                l = n('t5QW'),
                i = n('dFGD'),
                m = n('2wcA'),
                r = function(e) {
                    var t = e.className;
                    return a.createElement(
                        c,
                        { className: t, documentTitle: 'React Boilerplate' },
                        a.createElement(h, null, 'React Boilerplate'),
                        a.createElement(
                            p,
                            { theme: { mode: l.b.TEXT }, to: m.a.SHOWCASE.pathWithParams({}) },
                            'Component Showcase'
                        ),
                        a.createElement(p, { theme: { mode: l.b.TEXT }, to: m.a.APOLLO_DEMO.path }, 'Apollo Demo'),
                        a.createElement(p, { theme: { mode: l.b.TEXT }, to: '/broken-link' }, 'Broken Link'),
                        a.createElement(
                            p,
                            {
                                theme: { mode: l.b.TEXT },
                                to: m.a.DEVELOPMENT.pathWithParams({
                                    name: 'Sir',
                                    id: '1',
                                    query: { querySingle: { absolutely: 'anything' }, queryArray: [!0, !1] },
                                    hash: 'hashValue',
                                }),
                            },
                            'Development'
                        )
                    );
                },
                c = Object(o.d)(i.a).withConfig({ componentId: 'f9lc1z-0' })([
                    'display:flex;flex-direction:column;align-items:flex-start;',
                ]),
                h = o.d.h1.withConfig({ componentId: 'f9lc1z-1' })(['font-weight:bold;margin:20px;']),
                p = Object(o.d)(l.a).withConfig({ componentId: 'f9lc1z-2' })(['margin:20px;']);
        },
    },
]);
