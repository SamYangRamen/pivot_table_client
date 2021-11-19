import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { useObservableState } from 'observable-hooks'
import SheetRepository from '../repository/SheetRepository'
import CellRepository from 'src/repository/CellRepository';

export default class RepositoryStore {
    @observable private sheetRepository: SheetRepository = new SheetRepository();
    @observable private cellRepository: CellRepository = new CellRepository();

    public getSheetRepository(): SheetRepository {
        return this.sheetRepository;
    }

    public getCellRepository(): CellRepository {
        return this.cellRepository;
    }
}