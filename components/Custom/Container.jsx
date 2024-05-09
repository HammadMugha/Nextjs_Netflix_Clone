import React from 'react'

export default function Container({children,className}) {
  return (
    <div className={`max-w-[1100px] mx-auto ${className} lg:max-w-[1300px]`}>{children}</div>
  )
}
