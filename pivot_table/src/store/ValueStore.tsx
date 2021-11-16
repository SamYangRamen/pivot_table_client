import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { useObservableState } from 'observable-hooks'

export interface SheetRange {
    row: number;
    col: number;
}

export default class ValueStore {
    @observable private sheetId: number = 0;
    @observable private sheetName: String = '';
    @observable private sheetRange: SheetRange = { row: 0, col: 0 };

    public getSheetId(): number {
        return this.sheetId;
    }

    public setSheetId(sheetId: number) {
        this.sheetId = sheetId;
    }

    public getSheetName(): String {
        return this.sheetName;
    }

    public setSheetName(sheetName: String) {
        this.sheetName = sheetName;
    }

    public getSheetRange(): SheetRange {
        return this.sheetRange;
    }

    public setSheetRange(sheetRange: SheetRange) {
        this.sheetRange.row = sheetRange.row;
        this.sheetRange.col = sheetRange.col;
    }

    public getRowSize(): number {
        return this.sheetRange.row;
    }

    public setRowSize(row: number) {
        this.sheetRange.row = row;
    }

    public getColSize(): number {
        return this.sheetRange.col;
    }

    public setColSize(col: number) {
        this.sheetRange.col = col;
    }
}
/*
const Values: React.FC<{ row: number, col: number }> = ({ row, col }) => {
    return (
        <ul>

        </ul>
    )
};
*/