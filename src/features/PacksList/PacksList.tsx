import React, {useEffect} from 'react';
import style from './PacksList.module.css'
import {TableRow} from './TableRow/TableRow';
import {addNewPackTC, deletePackTC, editPackTC, getPacksTC, setPacksAC} from './packsReducer';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {Navigate} from 'react-router-dom';
import {SettingsBar} from './SettingsBar/SettingsBar';
import {Pagination} from './Pagination/Pagination';
import {setIsOpenModalAC} from '../../appReducer';
import {Preloader} from '../../components/Preloader/Preloader';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import {DeleteModalWindow} from "../Modals/DeleteModalWindow/DeleteModalWindow";
import {
  AddEditPacksModalWindow,
  textFieldEditPackDataType
} from "../Modals/AddEditPackModalWindow/AddEditPackModalWindow";

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const cardPacks = useAppSelector(state => state.packs.cardPacks) // our packs
  const page = useAppSelector((state) => state.packs.page) // Текущая страница
  const pageCount = useAppSelector((state) => state.packs.pageCount) // Колод на странице
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount) // количество колод
  const isOpenModal = useAppSelector(state => state.app.isOpenModal)
  const currentDeckName = useAppSelector(state => state.packs.currentDeckName)
  const cerrentIdPack = useAppSelector(state => state.packs.currentPackId)

  const mode = useAppSelector(state => state.app.preloader)

  useEffect(() => {
    if (cardPacks.length === 0) {
      dispatch(getPacksTC())
    }
  }, [dispatch, cardPacks])

  const addNewPackHandler = () => {
    dispatch(setIsOpenModalAC('addNewPack'))
  }

  const onPageChanged = (page: number) => {
    dispatch(setPacksAC({page}))
    dispatch(getPacksTC())
  }

  const changePageSize = (pageCount: string) => {
    dispatch(setPacksAC({pageCount: +pageCount}))
    dispatch(getPacksTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }


  const renderHeadPacksTableRow = () => {
    return <tr style={{height: '48px'}}>
      <th>Name</th>
      <th>Cards</th>
      <th>LastUpdated</th>
      <th>Created by</th>
      <th>Actions</th>
    </tr>
  }

  const onDeleteModalWindowHandler = () => {
    dispatch(deletePackTC(cerrentIdPack))
    dispatch(setIsOpenModalAC('close'))
  }

  const onSubmitEditPack  =(data:textFieldEditPackDataType) => {
    dispatch(editPackTC({...data, _id:cerrentIdPack}))
  }
  const onSubmitAddNewPack  =(data:textFieldEditPackDataType) => {
    dispatch(addNewPackTC(data))
  }

  const renderCards = () => cardPacks.map((el) => {
    return (
      <TableRow
        key={el._id}
        packId={el._id}
        name={el.name}
        cardsCount={el.cardsCount}
        updated={el.updated}
        created={el.user_name}
        packUserId={el.user_id}
      />
    )
  });

  return (<>
      { isOpenModal === 'addNewPack' && <AddEditPacksModalWindow
        title={'Add new pack'}
        onSubmit={onSubmitAddNewPack}
      />}
      { isOpenModal === 'editPack' && <AddEditPacksModalWindow
        title={'Edit pack'}
        onSubmit={onSubmitEditPack}
        defaultValue={currentDeckName}
      />}
      { isOpenModal === 'deleteModal' && <DeleteModalWindow
        title={'Delete Pack'}
        modalText={`Do you really want to remove  "${currentDeckName}"? All cards will be deleted!`}
        onDelete={onDeleteModalWindowHandler}
      />}

      <div className={style.buttonAddNewPack}>
        <h2>Packs list</h2>
        <CustomButton buttonText={'Add new pack'} onClick={addNewPackHandler} variant={'contained'}/>
      </div>
      <div className={style.tableWrapper}>
        <SettingsBar/>
        <table className={style.headTable}>
          <thead>
          {renderHeadPacksTableRow()}
          </thead>
          <tbody>
          {mode && <Preloader/>}
          {!mode && renderCards()}
          </tbody>
        </table>
        <Pagination
          onPageChanged={onPageChanged}
          changePageSize={changePageSize}
          pageSize={pageCount}
          currentPage={page}
          totalCount={cardPacksTotalCount}/>
      </div>
    </>
  );
};
