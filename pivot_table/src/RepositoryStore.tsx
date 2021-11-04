import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { useObservableState } from 'observable-hooks'
import SheetRepository from './SheetRepository'

export default class RepositoryStore {
    @observable private sheetRepository: SheetRepository = new SheetRepository();

    public getSheetRepository(): SheetRepository {
        return this.sheetRepository;
    }
}