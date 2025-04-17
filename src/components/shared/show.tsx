import React from 'react'

type ShowProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
  when?: boolean
}

const Show = (props: ShowProps) => {
  const { children, fallback, when } = props
  if (when) {
    return <>{children}</>
  }
  return fallback || null
}

export default Show