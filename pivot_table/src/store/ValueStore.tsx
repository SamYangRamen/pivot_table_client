import React from 'react';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react'
import { useObservableState } from 'observable-hooks'
import { CellDataDTO } from 'src/repository/SheetRepository';

export interface SheetRange {
    row: number;
    col: number;
}

export default class ValueStore {
    @observable private sheetId: number = 0;
    @observable private sheetName: String = '';
    @observable private sheetRange: SheetRange = { row: 0, col: 0 };
    @observable private cells: Array<CellDataDTO> = [];

    @observable private isClicked: boolean = false;
    @observable private clickBaseCellRowIdx: number = -1;
    @observable private clickBaseCellColIdx: number = -1;
    @observable private clickStartCellRowIdx: number = 0;
    @observable private clickStartCellColIdx: number = 0;
    @observable private clickEndCellRowIdx: number = 0;
    @observable private clickEndCellColIdx: number = 0;

    @observable private isMouseOut: boolean = false;

    public constructor() {
        makeObservable(this);
    }

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

    public getIsClicked(): boolean {
        return this.isClicked;
    }

    public setIsClicked(isClicked: boolean) {
        this.isClicked = isClicked;
    }

    public getClickStartCellRowIdx(): number {
        return this.clickStartCellRowIdx;
    }

    public setClickStartCellRowIdx(idx: number) {
        this.clickStartCellRowIdx = idx;
    }

    public getClickStartCellColIdx(): number {
        return this.clickStartCellColIdx;
    }

    public setClickStartCellColIdx(idx: number) {
        this.clickStartCellColIdx = idx;
    }

    public getClickEndCellRowIdx(): number {
        return this.clickEndCellRowIdx;
    }

    public setClickEndCellRowIdx(idx: number) {
        this.clickEndCellRowIdx = idx;
    }

    public getClickEndCellColIdx(): number {
        return this.clickEndCellColIdx;
    }

    public setClickEndCellColIdx(idx: number) {
        this.clickEndCellColIdx = idx;
    }

    public getClickBaseCellRowIdx(): number {
        return this.clickBaseCellRowIdx;
    }

    public setClickBaseCellRowIdx(idx: number) {
        this.clickBaseCellRowIdx = idx;
    }

    public getClickBaseCellColIdx(): number {
        return this.clickBaseCellColIdx;
    }

    public setClickBaseCellColIdx(idx: number) {
        this.clickBaseCellColIdx = idx;
    }

    public getIsMouseOut(): boolean {
        return this.isMouseOut;
    }

    public setIsMouseOut(isMouseOut: boolean) {
        this.isMouseOut = isMouseOut;
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