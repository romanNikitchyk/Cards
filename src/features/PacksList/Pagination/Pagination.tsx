import React, {FC} from 'react'
import styles from './Pagination.module.css'
import Select from '../Select/Select'

type PropsType = {
  onPageChanged: (page: number) => void
  totalCount: number
  currentPage: number
  pageSize: number
  changePageSize?: (pageCount: string) => void
  optionsPageSize?: string[]
}

export const Pagination: FC<PropsType> = ({
                                            onPageChanged,
                                            totalCount,
                                            pageSize,
                                            currentPage,
                                            changePageSize,

                                            optionsPageSize,
                                          }) => {
  let isEnd = false
  let isStart = true
  let firstPageIdx = 1
  let lastPageIdx = 5

  const pages: number[] = []
  const pageCount = Math.ceil(totalCount / pageSize)
  for (let i = 0; i <= pageCount; i++) {
    pages.push(i)
  }

  if (currentPage - 3 >= 1) {
    firstPageIdx = currentPage - 2
    isStart = false
  }
  if (currentPage - 3 >= 1) {
    lastPageIdx = currentPage + 2
  }
  if (currentPage + 3 > pageCount) {
    firstPageIdx = pageCount - 4
    isEnd = true
  }
  const slicedPages = pages.slice(firstPageIdx, lastPageIdx + 1)

  const onPreviousChangedHandler = () => {
    onPageChanged(currentPage - 1)
  }
  const onNextChanged = () => {
    onPageChanged(currentPage + 1)
  }
  const onLastChangedHandler = () => {
    onPageChanged(pageCount)
  }
  const onFirstChangedHandler = () => {
    onPageChanged(1)
  }

  const selectOptions = optionsPageSize ? optionsPageSize : [`5`, '10', '15', '20']

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.previousBtn} ${styles.arrow}`}
        onClick={onPreviousChangedHandler}
        disabled={currentPage === 1}
        type={'button'}
      />

      <button
        className={`${styles.defaultBtnPage} ${styles.firstPage}`}
        onClick={onFirstChangedHandler}
        hidden={isStart}
        type={'button'}
      >
        1
      </button>

      <span className={styles.points} hidden={isStart}>
        ...
      </span>

      <span className={styles.slicedPages}>
        {slicedPages.map((page, i) => {
          const onPageChangedHandler = () => {
            onPageChanged(page)
          }
          const isSelectedPage = page === currentPage
          return (
            <button
              key={i}
              className={`${styles.defaultBtnPage} ${isSelectedPage ? styles.selectedPage : ''}`}
              type={'button'}
              disabled={isSelectedPage}
              onClick={onPageChangedHandler}
            >
              {page}
            </button>
          )
        })}
      </span>

      <span className={styles.points} hidden={isEnd}>
        ...
      </span>

      <button
        className={`${styles.defaultBtnPage} ${styles.lastPage}`}
        onClick={onLastChangedHandler}
        hidden={isEnd}
        type={'button'}
      >
        {pageCount ? pageCount : ''}
      </button>

      <button
        onClick={onNextChanged}
        className={`${styles.nextBtn} ${styles.arrow}`}
        disabled={currentPage === pageCount}
        type={'button'}
      />

      {changePageSize && (
        <span className={styles.pageCount}>
          Show <Select options={selectOptions} value={pageSize} onChangeOption={changePageSize}/>{' '}
          Cards per Page
        </span>
      )}
    </div>
  )
}
