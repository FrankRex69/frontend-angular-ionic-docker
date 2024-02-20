/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { ListItemState, ListItemStore } from '../list-item-store/list-item.store';
import { QueryEntity } from '@datorama/akita';

@Injectable({
    providedIn: 'root'
  })
  export class ListItemQuery extends QueryEntity<ListItemState> {
  
    selectAreListItemLoaded$ = this.select(state => {
      return state.selectAreListItemLoaded;
    });
  
    constructor(protected store: ListItemStore) {
      super(store);
    }
  }