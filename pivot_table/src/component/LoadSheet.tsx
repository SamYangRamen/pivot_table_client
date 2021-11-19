import { apiDefineProperty } from 'mobx/dist/internal';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import SheetRepository, { SheetInfoDTO } from 'src/repository/SheetRepository';
import useStore from 'src/store/useStore';
import EditSheet from 'src/component/EditSheet';

/* DB에 저장되었던 Sheet 정보들을 불러오는 코드 */

const LoadSheet: React.FC = () => {
    const { valueStore, repositoryStore } = useStore();
    const repo = repositoryStore.getSheetRepository();

    const [title, setTitle] = useState<JSX.Element>();
    const [panel, setPanel] = useState<Array<JSX.Element>>([]);

    let sheetInfoList: SheetInfoDTO[];

    const onClickToLoad = (e: any) => {
        valueStore.setSheetId(parseInt(e.target.name));
        valueStore.setSheetName(sheetInfoList[parseInt(e.target.placeholder)].sheetName);
        valueStore.setSheetRange({ row: sheetInfoList[parseInt(e.target.placeholder)].maxRow, col: sheetInfoList[parseInt(e.target.placeholder)].maxCol });

        setTitle(<></>); // 가비지 콜렉션 수행
        setPanel([]); // 가비지 콜렉션 수행
    }

    const onClickToDelete = (e: any) => {
        const sheetId = parseInt(e.target.name);

        repo.deleteSheetData(sheetId)
            .then(response => {
                if (response == 1) {
                    alert("성공적으로 삭제되었습니다.");
                    showSheetInfoList();
                }
                else {
                    alert("error");
                }
            }).catch(e => {
                alert("알 수 없는 오류가 발생했습니다.")
            })
    }

    const showSheetInfoList = () => {
        const panelData: Array<JSX.Element> = [];

        setTitle(<>편집할 시트를 선택하세요. <br /><br /></>);

        repo.getSheetInfoList().then(response => {
            sheetInfoList = response;

            for (let i = 0; i < sheetInfoList.length; i++) {
                const value = `[id: ${sheetInfoList[i].sheetId}][name: ${sheetInfoList[i].sheetName}][size: ${sheetInfoList[i].maxRow}*${sheetInfoList[i].maxCol}]`;
                panelData.push(
                    <div id={`panelData${i}`}>
                        <Link to="/EditSheet">
                            <input type="button" name={sheetInfoList[i].sheetId.toString()} placeholder={i.toString()} value={value} onClick={onClickToLoad} />
                        </Link>
                        <input type="button" name={sheetInfoList[i].sheetId.toString()} placeholder={i.toString()} value="삭제" onClick={onClickToDelete} />
                        <br />
                    </div>
                )
            }
            setPanel(panelData);
        }).catch(e => {
            alert("데이터를 불러오지 못했습니다.");
        });
    }

    useEffect(() => {
        if (valueStore.getSheetId())
            valueStore.deleteAllSheetData();
        showSheetInfoList();
    }, []);

    return (
        <div className='LoadSheet'>
            <div>{title}</div>
            <div>{panel}</div>
            <Link to='/'>
                <button>뒤로가기</button>
            </Link>
            <Route exact path="/EditSheet" component={EditSheet} />
        </div>
    );
};

export default LoadSheet;