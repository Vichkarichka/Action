import moment from "moment/moment";
import React from 'react'
import axios from "axios/index";
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';
import CountDown from './CountDown';


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


export const renderLot = (lot) => {
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
                </Item.Meta>
                <Item.Description>{urlItem.descriptionLot}</Item.Description>
                {
                    moment(urlItem.startTime).format('DD.MM.YYYY, LTS') <= new Date(Date.now()).toLocaleString('ru') &&
                    <CountDown date={urlItem.endTime}/>
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

