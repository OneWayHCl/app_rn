
import React from "react";
import {observable, action, makeObservable, makeAutoObservable} from 'mobx'; 

export default class HomeViewModel {
  
    constructor() {
        makeAutoObservable(this);
    }
    
    modalVisible: boolean = false;

    changeVisible(value: boolean) {
        this.modalVisible = value;
    }

}

