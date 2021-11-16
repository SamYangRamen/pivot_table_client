import { apiDefineProperty } from 'mobx/dist/internal';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import SheetRepository, { SheetInfoDTO } from 'src/repository/SheetRepository';
import useStore from 'src/store/useStore';
import EditSheet from 'src/component/EditSheet';

/* DB에 저장되었던 Sheet 정보를 하나 정해서 불러오는 코드 */

const LoadSheet: React.FC = () => {
    const { valueStore } = useStore();
    const repo = useStore().repositoryStore.getSheetRepository();
    const [num, setNum] = useState(-1);
    const [panel, setPanel] = useState<JSX.Element[]>();

    let sheetInfoList: SheetInfoDTO[];

    const onClick = (e: any) => {
        valueStore.setSheetId(parseInt(e.target.placeholder));
        valueStore.setSheetName(sheetInfoList[parseInt(e.target.placeholder)].sheetName);
        valueStore.setSheetRange({ row: sheetInfoList[parseInt(e.target.placeholder)].maxRow, col: sheetInfoList[parseInt(e.target.placeholder)].maxCol });
        setPanel([]);
    }

    useEffect(() => {
        const panelData: JSX.Element[] = [];
        panelData.push(
            <>편집할 시트를 선택하세요. <br /><br /></>
        )

        repo.getSheetInfoList()
            .then(response => {
                sheetInfoList = response;

                for (let i = 0; i < sheetInfoList.length; i++) {
                    const value = `[id: ${sheetInfoList[i].sheetId}][name: ${sheetInfoList[i].sheetName}][size: ${sheetInfoList[i].maxRow}*${sheetInfoList[i].maxCol}]`;
                    panelData.push(
                        <Link to="/LoadSheet/EditSheet">
                            <input type="button" name={sheetInfoList[i].sheetId.toString()} placeholder={i.toString()} value={value} onClick={onClick} /><br />
                        </Link>
                    )
                }
                // [id: {sheetInfoList[i].sheetId}][name: {sheetInfoList[i].sheetName}][size: {sheetInfoList[i].maxRow}*{sheetInfoList[i].maxCol}]
                setPanel(panelData);
            }).catch(e => {
                alert("데이터를 불러오지 못했습니다.");
            });
    }, []);

    return (
        <div>
            <div>{panel}</div>
            <Link to='/'>
                <button>뒤로가기</button>
            </Link>
            <Route path="/LoadSheet/EditSheet" component={EditSheet} />
        </div>
    );
};

export default LoadSheet;