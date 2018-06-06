/**
 *
 * SearchPanel.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/2
 *
 * @内容 作用
 * @内容 作用
 */


'use strict';
import * as React from 'react';
import {PureComponent} from 'react';
import './SearchPanel.scss'
import C3DataTimePicker from '../../components/C3DataTimePicker/C3DataTimePicker'
import {HisdataContext, HisDataContextConsumer, IHisDataContext} from "../../Context/HistoryDataContext";

interface orderProps {

}

class SearchPanelComponent extends PureComponent <orderProps, any> {
    taskcodeInput:HTMLInputElement;
    paramNameInput:HTMLInputElement;
    measureTimeFrom:string;
    measureTimeTo:string;
    constructor(props){
        super(props);
        this.measureTimeFrom='';
        this.measureTimeTo='';
        this.onDatePickChange=this.onDatePickChange.bind(this);
    }
    onDatePickChange(pickDate){
        this.measureTimeFrom=pickDate[0];
        this.measureTimeTo=pickDate[1];
    }
    render() {
        return (
            <div className="search_panel">
                <span className="searchPanel_title">查询条件</span>
                <form id="formSearch" className="form-horizontal">
                    <div className="form-group">
                        <label className="ncse_input_label control-label col-sm-1"
                               htmlFor="txt_search_departmentname">任务代号:</label>
                        <div className="col-sm-3">
                            <input type="text" className="ncse_input" id="txt_search_departmentname"/>
                        </div>
                        <div className="formSearch_gap"></div>
                        <label className="ncse_input_label control-label col-sm-1"
                               htmlFor="txt_search_statu">参数名称:</label>
                        <div className="col-sm-3">
                            <input type="text" className="ncse_input" id="txt_search_statu"/>
                        </div>
                    </div>
                    <div className="form-group form-inline">
                        <label className="control-label col-lg-1">存档时间:</label>
                        <C3DataTimePicker onchange={this.onDatePickChange}></C3DataTimePicker>
                        {/*<div className="col-lg-7">从*/}
                            {/*<div className="input-group date form_date col-lg-5" data-date-format="yyyy-mm-dd"*/}
                                 {/*data-link-field="dtp_input1">*/}
                                {/*<input className="ncse_input form-control " size={16} type="text" value=""/>*/}
                                    {/*<div className="input-group-addon">*/}
                                        {/*<div className="glyphicon glyphicon-remove"></div>*/}
                                    {/*</div>*/}
                                    {/*<div className="input-group-addon">*/}
                                        {/*<div className="glyphicon glyphicon-calendar"></div>*/}
                                    {/*</div>*/}
                            {/*</div>*/}
                            {/*至*/}
                            {/*<div className="input-group date form_date col-lg-5" data-date-format="yyyy-mm-dd"*/}
                                 {/*data-link-field="dtp_input1">*/}
                                {/*<input className="ncse_input form-control " size={16} type="text" value=""/>*/}
                                    {/*<div className="input-group-addon">*/}
                                        {/*<div className="glyphicon glyphicon-remove"></div>*/}
                                    {/*</div>*/}
                                    {/*<div className="input-group-addon">*/}
                                        {/*<div className="glyphicon glyphicon-calendar"></div>*/}
                                    {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <HisdataContext.Consumer>
                            {(context:IHisDataContext)=>
                                <button type="button" id="btn_query" onClick={()=>{
                                    //todo 修改查询方法
                                    context.updateHisdata(this.measureTimeFrom,this.measureTimeTo,this.taskcodeInput.value,this.paramNameInput.value)
                                }} className="btn btn-primary col-lg-1">
                                    查询
                                </button>
                            }
                        </HisdataContext.Consumer>
                    </div>
                </form>
            </div>
        )
    }
}

export default (SearchPanelComponent)
