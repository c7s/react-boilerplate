(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{OWfV:function(n,e,t){"use strict";t.r(e);var r=t("q1tI"),a=t.n(r),o=t("uNLN"),i=t("3QLr");function u(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=[],r=!0,a=!1,o=void 0;try{for(var i,u=n[Symbol.iterator]();!(r=(i=u.next()).done)&&(t.push(i.value),!e||t.length!==e);r=!0);}catch(n){a=!0,o=n}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return t}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c,l=t("HZXQ"),f=t("jKAY"),d=t("4PEd"),s=t("m+3I"),m=function(n){return r.createElement(l.a,n,r.createElement(f.a,null,r.createElement(d.a,{source:"id"}),r.createElement(s.a,{source:"name"})))},b=t("lwYI"),p=function(n){return r.createElement(b.a,n,r.createElement(f.a,null,r.createElement(d.a,{source:"id"}),r.createElement(s.a,{source:"name"})))},v=t("dtWe"),h=t("2M74"),y=t("1Xf8"),k=t("uha5"),A=function(n){return a.a.createElement(v.a,n,a.a.createElement(h.a,null,a.a.createElement(y.a,{source:"id"}),a.a.createElement(y.a,{source:"name"}),a.a.createElement(k.a,null)))},O=t("sQHF"),E=t("YCLT");!function(n){n.BOOK="book",n.AUTHOR="author"}(c||(c={}));var $=function(n){return r.createElement(l.a,n,r.createElement(f.a,null,r.createElement(d.a,{source:"id"}),r.createElement(s.a,{source:"title"}),r.createElement(O.a,{source:"relations.author.id",reference:c.AUTHOR},r.createElement(E.a,{optionText:"name"}))))},g=function(n){return r.createElement(b.a,n,r.createElement(f.a,null,r.createElement(d.a,{source:"id"}),r.createElement(s.a,{source:"title"}),r.createElement(O.a,{source:"relations.author.id",reference:c.AUTHOR},r.createElement(E.a,{optionText:"name"}))))},j=t("3xmc"),w=function(n){return a.a.createElement(v.a,n,a.a.createElement(h.a,null,a.a.createElement(y.a,{source:"id"}),a.a.createElement(y.a,{source:"title"}),a.a.createElement(j.a,{source:"relations.author.id",reference:c.AUTHOR,sortable:!1},a.a.createElement(y.a,{source:"name"})),a.a.createElement(k.a,null)))},B=t("7SgN"),P=t("kZpU"),F=t("lTCR"),D=t.n(F);function z(){var n=C(["\n    fragment AuthorFullAdmin on Author {\n        id\n        name\n    }\n"]);return z=function(){return n},n}function I(){var n=C(["\n    fragment BookFullAdmin on Book {\n        id\n        title\n        relations {\n            author {\n                id\n            }\n        }\n    }\n"]);return I=function(){return n},n}function C(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var U=D()(I()),S=D()(z());function q(){var n=x(["\n    query AuthorOne($id: ID!) {\n        author {\n            one(id: $id) {\n                ...AuthorFullAdmin\n            }\n        }\n    }\n    ","\n"]);return q=function(){return n},n}function T(){var n=x(["\n    query BookOne($id: ID!) {\n        book {\n            one(id: $id) {\n                ...BookFullAdmin\n            }\n        }\n    }\n    ","\n"]);return T=function(){return n},n}function x(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var R={book:D()(T(),U),author:D()(q(),S)};function H(){var n=M(["\n    query AuthorList($sort: AuthorSort, $pagination: PaginationParams, $filter: AuthorFilter) {\n        author {\n            many(sort: $sort, pagination: $pagination, filter: $filter) {\n                items {\n                    ...AuthorFullAdmin\n                }\n                pagination {\n                    findCount\n                }\n            }\n        }\n    }\n    ","\n"]);return H=function(){return n},n}function L(){var n=M(["\n    query BookList($sort: BookSort, $pagination: PaginationParams, $filter: BookFilter) {\n        book {\n            many(sort: $sort, pagination: $pagination, filter: $filter) {\n                items {\n                    ...BookFullAdmin\n                }\n                pagination {\n                    findCount\n                }\n            }\n        }\n    }\n    ","\n"]);return L=function(){return n},n}function M(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var Q={book:D()(L(),U),author:D()(H(),S)};function K(){var n=Y(["\n    query AuthorMany($ids: [Int!]!) {\n        author {\n            many(filter: { fields: { id: { list: $ids } } }) {\n                items {\n                    ...AuthorFullAdmin\n                }\n                pagination {\n                    findCount\n                }\n            }\n        }\n    }\n    ","\n"]);return K=function(){return n},n}function N(){var n=Y(["\n    query BookMany($ids: [Int!]!) {\n        book {\n            many(filter: { fields: { id: { list: $ids } } }) {\n                items {\n                    ...BookFullAdmin\n                }\n                pagination {\n                    findCount\n                }\n            }\n        }\n    }\n    ","\n"]);return N=function(){return n},n}function Y(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var J={book:D()(N(),U),author:D()(K(),S)};function W(){var n=Z(["\n    mutation BookCreate($data: BookCreateData!) {\n        book {\n            create {\n                one(data: $data) {\n                    ...BookFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return W=function(){return n},n}function X(){var n=Z(["\n    mutation AuthorCreate($data: AuthorCreateData!) {\n        author {\n            create {\n                one(data: $data) {\n                    ...AuthorFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return X=function(){return n},n}function Z(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var _={author:D()(X(),S),book:D()(W(),U)};function V(){var n=nn(["\n    mutation BookUpdate($id: ID!, $data: BookUpdateData!) {\n        book {\n            update {\n                one(id: $id, data: $data) {\n                    ...BookFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return V=function(){return n},n}function G(){var n=nn(["\n    mutation AuthorUpdate($id: ID!, $data: AuthorUpdateData!) {\n        author {\n            update {\n                one(id: $id, data: $data) {\n                    ...AuthorFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return G=function(){return n},n}function nn(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var en={author:D()(G(),S),book:D()(V(),U)};function tn(){var n=an(["\n    mutation BookDelete($id: ID!) {\n        book {\n            delete {\n                one(id: $id) {\n                    ...BookFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return tn=function(){return n},n}function rn(){var n=an(["\n    mutation AuthorDelete($id: ID!) {\n        author {\n            delete {\n                one(id: $id) {\n                    ...AuthorFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return rn=function(){return n},n}function an(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var on={author:D()(rn(),S),book:D()(tn(),U)};function un(){var n=ln(["\n    mutation BookDeleteMany($ids: [ID!]!) {\n        book {\n            delete {\n                many(ids: $ids) {\n                    ...BookFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return un=function(){return n},n}function cn(){var n=ln(["\n    mutation AuthorDeleteMany($ids: [ID!]!) {\n        author {\n            delete {\n                many(ids: $ids) {\n                    ...AuthorFullAdmin\n                }\n            }\n        }\n    }\n    ","\n"]);return cn=function(){return n},n}function ln(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var fn={author:D()(cn(),S),book:D()(un(),U)};function dn(n){return(dn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function sn(n,e,t,r,a,o,i){try{var u=n[o](i),c=u.value}catch(n){return void t(n)}u.done?e(c):Promise.resolve(c).then(r,a)}function mn(n,e){if(null==n)return{};var t,r,a=function(n,e){if(null==n)return{};var t,r,a={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}var bn=function(){var n=function(n,e,t){var r,a,o=!0;switch(n){case B.g:r=R[e],a={id:t.id};break;case B.e:r=J[e],a={ids:t.ids};break;case B.d:r=Q[e],a={pagination:{offset:t.pagination.perPage*(t.pagination.page-1),limit:t.pagination.perPage},sort:pn(t.sort)};break;case B.a:r=_[e],a={data:t.data},o=!1;break;case B.h:r=en[e];var i=t.data;a={id:i.id,data:vn(mn(i,["id"]))},o=!1;break;case B.b:r=on[e],a={id:t.id},o=!1;break;case B.c:r=fn[e],a={ids:t.ids},o=!1;break;default:throw new Error("Unsupported fetch action type ".concat(n))}return{gqlDocument:r,variables:a,isQuery:o}},e=function(n,e,t){var r={};switch(e){case B.g:r={data:n[t].one};break;case B.e:r={data:n[t].many.items};break;case B.d:r={data:n[t].many.items,total:n[t].many.pagination.findCount};break;case B.a:r={data:n[t].create.one};break;case B.h:r={data:n[t].update.one};break;case B.b:r={data:n[t].delete.one};break;case B.c:r={data:n[t].delete.many};break;default:throw new Error("Unsupported response type ".concat(e))}return r};return function(){var t,r=(t=regeneratorRuntime.mark(function t(r,a,o){var i,u,c,l,f;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=n(r,a,o),u=i.gqlDocument,c=i.variables,l=i.isQuery,t.next=3,l?P.a.getClient().query({query:u,variables:c}):P.a.getClient().mutate({mutation:u,variables:c});case 3:return f=t.sent,t.abrupt("return",e(f.data,r,a));case 5:case"end":return t.stop()}},t)}),function(){var n=this,e=arguments;return new Promise(function(r,a){var o=t.apply(n,e);function i(n){sn(o,r,a,i,u,"next",n)}function u(n){sn(o,r,a,i,u,"throw",n)}i(void 0)})});return function(n,e,t){return r.apply(this,arguments)}}()};function pn(n){var e=null;return n.field&&(e={fields:[{field:n.field,type:n.order.toUpperCase()}]}),e}function vn(n){return delete n.__typename,Object.values(n).forEach(function(n){"object"===dn(n)&&null!==n&&vn(n)}),n}t.d(e,"AdminPage",function(){return hn});var hn=function(){return function(){var n=u(a.a.useState(!1),2),e=n[0],t=n[1];return a.a.useEffect(function(){t(!0)},[]),e}()?r.createElement(o.a,{dataProvider:bn()},r.createElement(i.a,{name:c.BOOK,list:w,create:$,edit:g}),r.createElement(i.a,{name:c.AUTHOR,list:A,create:m,edit:p})):null}}}]);