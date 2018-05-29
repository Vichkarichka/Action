import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';
import Books from '../Style/Books/Book.jpeg';
import Clothing from '../Style/Clothing.jpeg';
import Computers from '../Style/Computers.jpeg';
import Footwear from '../Style/Footwear.jpeg';
import Furniture from '../Style/Furniture.jpeg';
import Jewelry from '../Style/Jewelry.jpeg';
import Painting from '../Style/Painting.jpeg';
import Phone from '../Style/Phone.jpeg';
import './ImageForSections.css';

this.displayImage = (img, text) => {

    let display =
        <div style ={{ position:'relative'}}>
            <Image src={img} style ={{width:1400}}/>
            <label className= 'texts'  >{text}</label>
        </div>

    return display;
};

export const ImageForSections = (id) => {

    switch(id){
        case 1 : return (
            this.displayImage(Furniture, "FURNITURE")
        );
        case 2 : return (
            this.displayImage(Clothing, "CLOTHING" )
        );
        case 3 : return (
            this.displayImage(Jewelry, "JEWELRY")
        );
        case 4 : return (
            this.displayImage(Painting, "PAINTING")
        );
        case 5 : return (
            this.displayImage(Books, "BOOKS")
        );
        case 6 : return (
            this.displayImage(Footwear, "FOOTWEAR")
        );
        case 7 : return (
            this.displayImage(Phone, 'PHONES')
        );
        case 8 : return (
            this.displayImage(Computers, "COMPUTERS")
        );
        default:
            break;
    }

};
