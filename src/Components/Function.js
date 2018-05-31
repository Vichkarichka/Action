import moment from "moment/moment";
import React from 'react'
import axios from "axios/index";
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';
import CountDown from './CountDown';
import {ErrorObject} from "./ErrorObject";


export const getSections = () => {
    let initialCategory = [];
  return axios.get('http://127.0.0.1:8200/newLots')
        .then(response => {
            initialCategory = response.data.result.map((category) => {
                return category;
            });
            return initialCategory;
        }).catch(function (error) {
        console.log(error);
    });
};

this.selectDisplay = (start, end) => {
    let display;
    if(new Date(end) < new Date(Date.now())) {
        display =  <strong>{"AUCTION IS OVER"}</strong>
    } else if(new Date(start) < new Date(Date.now())) {
        display =  <CountDown date={end}/>
    } else {
        display = <strong>{"AUCTION START " + Math.round((new Date(start) - new Date(Date.now()))*1.1574074074074074e-8) + " DAY"}</strong>
    }
    return display;
};

export const renderLot = (lot, valueBid) => {

    let display = lot.map((urlItem) =>
        <Item key = {urlItem.idLot} >
            <Item.Image size= "small" src={'http://localhost:8200/'+ ((urlItem.img && urlItem.img[0].imagesLotUrl) || 'ImageLot/empty.png' )  } />

            <Item.Content  key = {urlItem.idLot} >
                <Link to={`/lotsUser/${urlItem.idLot}`}>
                    <Item.Header   key = {urlItem.idLot}>
                        {urlItem.nameLot}
                    </Item.Header>
                </Link>
                <Item.Meta>
                    <span>{urlItem.newBid + '$'}</span>
                    {
                        valueBid &&
                        <span>{'Your last bid: ' + valueBid + '$'}</span>
                    }
                </Item.Meta>
                <Item.Description>{urlItem.descriptionLot}</Item.Description>
                {
                    this.selectDisplay(urlItem.startTime,urlItem.endTime)
                }
                <Item.Extra>
                    <Label>{urlItem.categoryLot}</Label>
                </Item.Extra>
                <Item.Extra content={urlItem.nameUser} />
            </Item.Content>
        </Item>
    );
    return display;
};


