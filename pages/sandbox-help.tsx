import React from 'react'
import type { NextPage } from 'next'

const Page: NextPage = () => {
    const content = `# Welcome to Markdown

    ## Explanation
    
    In this post we will show what *Parsedown* generates out of this **markdown** snippet.
    We will show what the resulting  looks like. We will look at:
    
      * Headlines
      * Formatting within text
      * Lists
      * Paragraphs
      * Blockquotes
    
    Note that --- not considering the asterisk --- the actual text
    content starts indentend.
    
    > If you want to use a quote by someone else you can do this with a 
    > blockquote like this.`
    return <div>{{ content }}</div>
}

export default Page
