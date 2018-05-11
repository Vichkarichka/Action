import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import SettingUser from "./SettingUser";
import NewLots from "./NewLots";
import UserLots from "./UserLots";

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