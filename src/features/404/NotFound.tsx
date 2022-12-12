import React, {CSSProperties} from 'react'

const headingNotFound: CSSProperties = {
  textAlign: 'center',
  fontSize: '6rem',
  lineHeight: '200%',
}
export const NotFound = () => {
  return (<div style={headingNotFound}>
      <span style={{display:"inline-block"}}>404 NOT FOUND</span>
    </div>
  )
}