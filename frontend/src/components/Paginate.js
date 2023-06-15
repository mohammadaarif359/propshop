import React from 'react'
import {Pagination,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'

const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {
    console.log('total pages',pages);
    console.log('page',page);

  return pages > 1 && (
    <Pagination>
        {[...Array(pages).keys()].map(x=>(
            <>
            {/*<Link as={Link} to={keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`} key={x+1}>
                <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
        </Link>*/}
            <Link className={`page-link ${x+1 === page && 'active'}`} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/productlist/${x+1}`} key={x+1}>{x+1}</Link>
            </>
        ))}
    </Pagination>
  )
}

export default Paginate