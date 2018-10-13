const unified = require('unified');
const parse = require('remark-parse');
const remark2rehype = require('remark-rehype');
const toVdom = require('../../index');
// const renderer = require('remark-preact-renderer');

const { h, render } = require('preact');

const processor = unified()
    .use(parse, {})
    .use(remark2rehype)
    .use(toVdom, {
        h: h,
        rootTagName: 'main',
        rootClassName: 'markdown-body'
        // renderer: renderer
    });


const mdast = processor.parse('# h1');
// mdast.properties = {
//     'className': ['markdown-body']
// };
// mdast.data = {
//     hProperties: {
//         'className': ['markdown-body']
//     }
// };

console.log(mdast);


const vdom = processor.runSync(mdast);
console.log(vdom);

render(vdom, document.getElementById('app'));

// const render = require('preact-render-to-string');
// const html = render(vdom);
// console.log(html);