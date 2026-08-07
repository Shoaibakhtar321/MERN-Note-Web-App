import React from 'react'

const PageTitle = ({title, count}) => {
  return (
    <div>
        <h2 className='text-2xl font-semibold pb-1'>{title}</h2>
        <p className='text-lg font-medium text-text/60'>{count}</p>
    </div>
  )
}

export default PageTitle