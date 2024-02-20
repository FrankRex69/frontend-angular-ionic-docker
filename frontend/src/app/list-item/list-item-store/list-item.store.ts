/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';

import { EntityStore, StoreConfig } from '@datorama/akita';
import { EntityState } from '@datorama/akita/src/lib/types';

import { IresponseListItem } from '@commons/interfaces/list-item.interface';

export interface ListItemState extends EntityState<IresponseListItem, number> {
  areListItemsLoaded: boolean;
}

export function createInitialState(): ListItemState {
  return {
    areListItemsLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'listitem' })
export class ListItemStore extends EntityStore<ListItemState> {

    constructor() {
        super(createInitialState());
    }

    loadListItem(listitem: IresponseListItem[], areListItemsLoaded: boolean) {
      this.set(listitem);
      this.update(state => ({
        ...state,
        areListItemsLoaded
      }));
    }
}
