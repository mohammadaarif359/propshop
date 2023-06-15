import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title,keywords,description}) => {
  return (
    <Helmet>
          <title>{title}</title>
          <meta name='keywords' content={keywords}/>
          <meta name='description' content={description}/>
        </Helmet>
  )
}

Meta.defaultProps = {
    title:'Welcome To ProhShops',
    keywords: 'electronic,electronic items',
    description: 'buy electronic at cheapest rate'
}

export default Meta