const unified = require('unified');
const parse = require('../remark-parse');
// const breaks = require('remark-breaks')

const remark2rehype = require('../remark-rehype');
const toVdom = require('../../index');
import Vue from 'vue';
var find = require('unist-util-find');

// const renderer = require('remark-preact-renderer');

// const { h, render } = require('preact');

const processor = unified()
    .use(parse, {
        commonmark: false,
        footnotes: true
    })
    // .use(breaks, {})

    .use(remark2rehype)
    // .use(toVdom, {
    //     h: h,
    //     rootTagName: 'main',
    //     rootClassName: 'markdown-body'
    //     // renderer: renderer
    // });

const md = require('./demo.md');

const app = new Vue({
    el: '#app',
    render(h) {
        console.log('================');

        console.time('all');

        console.time('parse');
        const mdast = processor.parse(md);
        console.timeEnd('parse');

        console.time('hast');
        const hast = processor.runSync(mdast);
        console.timeEnd('hast');

        var nodes = find(hast, function (node) {
            // console.log(node);
            return !node.position;
        });
        console.log('==========nodes===========');
        console.log(nodes);


        console.time('toVdom');
        const vdom = toVdom(hast, {
            mode: 'vue',
            // mode: function (node) {
            //     if(!node.properties) return {};
            //     var props = {
            //         attrs: node.properties,
            //     };
            //     if(node.properties.className) {
            //         props['class'] = node.properties.className;
            //         delete props.attrs.className;
            //     }
            //     return props;
            // },
            h: h,
            rootTagName: 'main',
            rootClassName: 'markdown-body'
        });
        console.timeEnd('toVdom');

        console.timeEnd('all');


        console.log(mdast);
        console.log(hast);
        return vdom;
    }
});

// for(let i=0;i<10;i++){
//     setTimeout(function () {
//         app.$forceUpdate();
//     }, i*1000);
// }






// mdast.properties = {
//     'className': ['markdown-body']
// };
// mdast.data = {
//     hProperties: {
//         'className': ['markdown-body']
//     }
// };


// const vdom = processor.runSync(mdast);
// console.log(vdom);

// render(vdom, document.getElementById('app'));

// const render = require('preact-render-to-string');
// const html = render(vdom);
// console.log(html);