import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import Template from "./Template";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={FirstPage}/>
            <Route exact path='/lk' component={Template}/>
        </Switch>
    </main>
)
export default Main;