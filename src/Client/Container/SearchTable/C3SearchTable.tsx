/**
 *
 * C3SearchTable.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/3
 *
 * @内容 作用
 * @内容 作用
 */

'use strict';
import * as React from 'react';
import {PureComponent} from 'react';
import './C3SearchTable.scss'
interface orderProps {

}
import {HisdataContext, HisDataContextProvider, IHisDataContext, IHistoryData} from '../../Context/HistoryDataContext'
class C3SearchTableComponent extends PureComponent <orderProps, any> {
    render() {
        return (
            <HisdataContext.Consumer >
                {
                    (context:IHisDataContext)=>(
                        <>
                <div className="table_panel">
                    <div className="databutton">
                        <button className="alldata" onClick={()=>{
                            context.updateAllHisDataCheckedStatus();
                        }}>所有数据</button>
                        <HisdataContext.Consumer >
                            {(context:IHisDataContext)=><button className="selecteddata" onClick={()=>{

                            }}>选中数据</button>}
                        </HisdataContext.Consumer>
                    </div>
                </div>
                  <div className="navigation">
                            <table id="tb_histData">
                                <thead>
                                <tr>
                                    <th className="navigationbar" data-field="0">
                                        <div className="th-inner ">选择框</div>
                                        <div className="fht-cell"></div>
                                    </th>
                                    <th className="navigationbar"  data-field="任务代号">
                                        <div className="th-inner ">参数名称</div>
                                        <div className="fht-cell"></div>
                                    </th>
                                    <th className="navigationbar"  data-field="参数名称">
                                        <div className="th-inner ">参数名称</div>
                                        <div className="fht-cell"></div>
                                    </th>
                                    <th className="navigationbar"  data-field="参数值">
                                        <div className="th-inner ">参数值</div>
                                        <div className="fht-cell"></div>
                                    </th>
                                    <th className="navigationbar"  data-field="测量时间">
                                        <div className="th-inner ">测量时间</div>
                                        <div className="fht-cell"></div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {context.data.hisData.map((item:IHistoryData,index)=>{
                                    return(
                                        <tr data-index={index} key={index} className="">
                                            <td className="bs-checkbox ">
                                                <input
                                                    type="checkbox"
                                                    checked={item[0]}
                                                    onChange={()=>{context.updateOneHisDataCheckedStatus(index)}}
                                                />
                                            </td>
                                            <td>{item.任务代号}</td>
                                            <td>{item.参数名称}</td>
                                            <td>{item.参数值}</td>
                                            <td>{item.测量时间}</td>
                                        </tr>
                                    )
                                })}


                                </tbody>
                            </table>
                        </div>)


            </>
                    )}
            </HisdataContext.Consumer>
        )
    }
}

export default (C3SearchTableComponent)
