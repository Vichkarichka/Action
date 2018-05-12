import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FirstPage from './HomePage/FirstPage';
import SettingUser from "./EditUser/SettingUser";
import NewLots from "./Lot\'s/NewLots";
import UserLots from "./Lot\'s/UserLots";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={FirstPage}/>
            <Route exact path='/lk' component={SettingUser}/>
            <Route exact path='/newLots' component={NewLots}/>
            <Route exact path='/lotsUser' component={UserLots}/>
        </Switch>
    </main>
);
export default Main;