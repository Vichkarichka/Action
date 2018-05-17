import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import FirstPage from './HomePage/FirstPage';
import SettingUser from "./EditUser/SettingUser";
import NewLots from "./Lot\'s/NewLots";
import UserLots from "./Lot\'s/UserLots";
import LotPage from "./Lot\'s/LotPage";
import SectionsPage from "./Lot\'s/SectionsPage";

const Main = () => (

    <Switch>
        <Route path="/" exact component={FirstPage} />
        <Route path="/lk" exact component={SettingUser} />
        <Route path="/newLots" exact component={NewLots} />
        <Route path="/lotsUser" exact component={UserLots} />
        <Route path="/lotsUser/:userId" exact component={LotPage} />
        <Route path="/sections/:sectionId" exact component={SectionsPage} />
    </Switch>

);
export default Main;