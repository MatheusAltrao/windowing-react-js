type CodeBlockProps = {
  title: string
  code: string
}

export default function CodeBlock({ title, code }: CodeBlockProps) {
  return (
    <figure className="code-block">
      <figcaption className="code-block__title">{title}</figcaption>
      <pre className="code-block__pre">
        <code className="code-block__code">{code.trim()}</code>
      </pre>
    </figure>
  )
}
