import * as React from 'react';
import {useCallback, useEffect} from 'react';
import {Box} from "@material-ui/core";
import Slider from '@material-ui/core/Slider'
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {getPacksTC, setPacksAC} from "../../packsReducer";
import _debounce from 'lodash/debounce'

export const RangeSlider = () => {
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const min = useAppSelector((state) => state.packs.min)
  const max = useAppSelector((state) => state.packs.max)

  useEffect(() => {
    dispatch(setPacksAC({min: minCardsCount, max: maxCardsCount}))
  }, [minCardsCount, maxCardsCount])

  const debounceFn = useCallback(
    _debounce(() => {
      dispatch(getPacksTC())
    }, 1000),
    [dispatch]
  )

  const handleChange = (event: any, newValue: number | number[]) => {
    const newValues = newValue as number[]
     dispatch(setPacksAC({ min:newValues[0], max:newValues[1] }))
    debounceFn()
  };
  return (
    <Box sx={{width: 250, paddingRight: 35}}>
      <Slider
        value={[min, max]}
        onChange={handleChange}
        valueLabelDisplay="on"
        min={minCardsCount}
        max={maxCardsCount} //в каком диапозоне работает doubleRange
      />
    </Box>
  );
}