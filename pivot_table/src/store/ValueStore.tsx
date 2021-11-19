import React from 'react';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react'
import { useObservableState } from 'observable-hooks'
import { CellDataDTO } from 'src/repository/SheetRepository';
import { CellInfoDTO } from 'src/repository/CellRepository';

export interface SheetRange {
    row: number;
    col: number;
}

export interface CellIdx {
    row: number;
    col: number;
}

export interface CellData {
    isPivot?: boolean;
    data?: string;
    dataType?: string;
}

export default class ValueStore {
    @observable private sheetId: number = 0;
    @observable private sheetName: String = '';
    @observable private sheetRange: SheetRange = { row: 0, col: 0 };
    @observable private cells: Map<string, CellData> = new Map<string, CellData>();

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

    public deleteAllSheetData() {
        this.sheetId = 0;
        this.sheetName = '';
        this.sheetRange = { row: 0, col: 0 };
        this.cells.clear();
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

    public initCells(cellArray: Array<CellInfoDTO>) {
        for (let i = 0; i < cellArray.length; i++) {
            const key: string = `${cellArray[i].row} ${cellArray[i].col}`;
            const value: CellDataDTO = {
                isPivot: cellArray[i].isPivot,
                data: cellArray[i].data || '',
                dataType: cellArray[i].dataType || '',
            }
            this.cells.set(key, value);
        }
    }

    public getCells(): Map<string, CellData> {
        return this.cells;
    }

    public getCell(row: number, col: number) {
        const key: string = `${row} ${col}`;
        return this.cells.get(key);
    }

    public setCell(row: number, col: number, isPivot: boolean, data: string, dataType: string) {
        const key: string = `${row} ${col}`;
        const value: CellData = { isPivot, data, dataType };
        this.cells.set(key, value);
    }

    public deleteCell(row: number, col: number) {
        const key: string = `${row} ${col}`;
        this.cells.delete(key);
    }

    public deleteCells() {
        this.cells.clear();
    }

    public parseKeyStringToNumbers(key: string): { row: number, col: number } {
        const keyNum: string[] = key.split(" ");
        return { row: parseInt(keyNum[0]), col: parseInt(keyNum[1]) };
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

    public getFixedValues() {
        return {
            cellRowWidth: 30,
            cellColWidth: 60,
            startPointTop: 100,
            startPointLeft: 50,
        }
    }

    public getCellIndex(clickRow: number, clickCol: number) {
        const { cellRowWidth, cellColWidth, startPointTop, startPointLeft } = this.getFixedValues();

        return {
            row: Math.floor((clickRow - startPointTop) / cellRowWidth),
            col: Math.floor((clickCol - startPointLeft) / cellColWidth),
        }
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