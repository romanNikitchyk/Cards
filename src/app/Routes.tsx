import {Route, Routes} from "react-router-dom"
import {Login} from "../features/Login/Login";
import {Register} from "../features/Register/Register";
import {NotFound} from "../features/404/NotFound";
import {Profile} from "../features/Profile/Profile";
import {PacksList} from "../features/PacksList/PacksList";
import {SettingsBar} from "../features/PacksList/SettingsBar/SettingsBar";
import {CardsList} from "../features/CardsList/CardsList";
import {LearnPage} from "../features/LearnPage/LearnPage";

export const RoutesPage = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Register/>}/>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/register'} element={<Register/>}/>
      <Route path={'/profile'} element={<Profile/>}/>
      <Route path={'/packslist'} element={<PacksList/>}/>
      <Route path={'/packslist/cardslist/:currentPackId/:packName'} element={<CardsList/>}/>
      <Route path={'/settingsbar'} element={<SettingsBar/>}/>
      <Route path={'/learnpage/:currentPackId/:packName'} element={<LearnPage/>}/>
      <Route path={'/*'} element={<NotFound/>}/>
    </Routes>
  )
}