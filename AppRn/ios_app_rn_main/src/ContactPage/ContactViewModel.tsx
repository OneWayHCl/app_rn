import { action, computed, makeObservable, observable } from "mobx";
import React from "react";

// 建立store
export const contactViewModel = makeObservable({
    count:1,
    get double(){return this.count * 2;},
    // 定义action
    increment(){this.count += 1;},
    decrement(){this.count -= 1;},
},{
    count: observable,//须要响应的属性
    double: computed,//计算属性
    increment: action,//action
    decrement: action,
});
