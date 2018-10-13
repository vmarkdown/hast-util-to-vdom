const unified = require('unified');
const parse = require('remark-parse');
const remark2rehype = require('remark-rehype');
const toVdom = require('../../index');
// const renderer = require('remark-preact-renderer');
// const renderer = require('./rehype-vue-renderer');

import Vue from 'vue';

const processor = unified()
    .use(parse, {})
    .use(remark2rehype)
    //rehype-vdom
    .use(function (options) {
        var self = this;
        return function transform(node) {
            var h = self.data('h');
            if(h) {options.h = h;}
            return toVdom(node, options)
        }
    }, {});
    // .use(toVdom, {
    //     rootTagName: 'main',
    //     rootClassName: 'markdown-body',
    //     mode: 'vue',
    //     // renderer: renderer,
    //     // data: function (node) {
    //     //     if(!node.properties) return {};
    //     //     var props = {
    //     //         attrs: node.properties,
    //     //     };
    //     //     if(node.properties.className) {
    //     //         props['class'] = node.properties.className;
    //     //         delete props.attrs.className;
    //     //     }
    //     //     return props;
    //     // }
    // });

const md = require('./demo.md');

const app = new Vue({
    el: '#app',
    render(h) {
        const mdast = processor.data('h', h).parse(md);
        console.log(mdast);
        const vdom = processor.runSync(mdast);
        console.log(vdom);
        return vdom;
    }
});
