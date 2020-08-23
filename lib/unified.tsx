import unified from "unified"
import remark from "remark-parse"
import remark2rehype from "remark-rehype"
import stringify from "rehype-stringify"
import raw from "rehype-raw"
import katex from "rehype-katex"
import math from "remark-math"
import minify from "rehype-minify-whitespace"
import prism from "mdx-prism"
import figure from "rehype-figure"
import codeTitle from "rehype-code-title"

// Compile markdown into html.
export default function compile(md: string) {
  return unified()
    .use({ settings: { position: false } })
    .use(remark, { commonmark: true })
    .use(math)
    .use(remark2rehype)
    .use(figure)
    .use(prism)
    .use(codeTitle)
    .use(katex, { strict: false, colorIsTextColor: true })
    .use(raw)
    .use(minify)
    .use(stringify)
    .processSync(md)
    .toString()
}
