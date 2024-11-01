import React from 'react'

const PageComponent = ({ serverData, movePage }) => {
    // listComponent에서 자식으로 사용할건데 props로 전달되면 그것을 여기서 사용함
    // console.log('Page Component: serverData', serverData, movePage)
  return (
    <div className='m-6 flex justify-center'>
        {serverData.prev ?
        <div>
            <div className='m-2 p-2 w-16 text-center font-bold text-blue-400' 
            onClick={() => movePage({page: serverData.prevPage})}>이전</div>
        </div> : <></>}

        {serverData.pageNumList.map(pageNum =>
            <div key={pageNum}
                className={`m-2 p-2 w-12 text-center rounded shadow-md text-white
                ${serverData.current === pageNum? 'bg-gray-500':'bg-blue-400'}`}
                onClick={() => movePage({page:pageNum})}>
            {pageNum}
            </div>
        )}

        {serverData.next?
        <div className='m-2 p-2 w-16 text-center font-bold text-blue-400'
            onClick={() => movePage({page: serverData.nextPage})}>
        다음
        </div> : <></>}
    </div>
  )
}

export default PageComponent