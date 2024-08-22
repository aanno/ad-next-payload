'use client'

import Script from 'next/script'
import React from 'react'

export const InitMath: React.FC = () => {
    // ignore eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    return (
        <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_HTMLorMML"
        id="math-lib"
        onLoad={() => {
MathJax.Hub.Config({
  messageStyle: "none",
  tex2jax: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]], ignoreClass: "nostem|nolatexmath" },
  asciimath2jax: { delimiters: [["\\$", "\\$"]], ignoreClass: "nostem|noasciimath" },
  TeX: { equationNumbers: { autoNumber: "none" } }
})
MathJax.Hub.Register.StartupHook("AsciiMath Jax Ready", function () {
  MathJax.InputJax.AsciiMath.postfilterHooks.Add(function (data, node) {
    if ((node = data.script.parentNode) && (node = node.parentNode) && node.classList.contains("stemblock")) {
      data.math.root.display = "block"
    }
    return data
  })
})
  }}
      />
      </>
  )
  // type="text/x-mathjax-config"
  // strategy="beforeInteractive"
}
