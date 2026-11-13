import { Fragment } from 'react'

/** Renders a heading split into lines with <br /> between them. */
export default function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  )
}
