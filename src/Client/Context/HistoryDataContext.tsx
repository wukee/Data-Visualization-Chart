/**
 *
 * HistoryDataContext.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/3
 *
 * @内容 作用
 * @内容 作用
 */
'use strict';
import * as React from 'react';
import produce from "immer";
import  axios from 'axios'
export const HisdataContext = React.createContext({});
const {Provider,Consumer} =HisdataContext;
/**
 * 参数名称
 */
type IparamName=string;
/**
 * 测量时间
 */
type ImeasureTime=string;//测量时间
/**
 * 参数值
 */
type IparamValue=string;
/**
 * 任务代号
 */
type ItaskCode= string;
/**
 * 图表数据元组
 */
type IMeasureTimeDateFormat=Date;
type IChartDataTuple=[IMeasureTimeDateFormat,IparamValue]
type ItaskCodeMap=Map<ItaskCode,Array<IChartDataTuple>>
type IparamMap=Map<IparamName,ItaskCodeMap>
export interface IHisDataContextState{
    hisData:Array<IHistoryData>,
    paramMap?:IparamMap
}

export interface IHisDataContext{
    data:IHisDataContextState,
    updateHisdata:()=>any
    updateOneHisDataCheckedStatus:(index:number)=>any
    updateAllHisDataCheckedStatus:()=>any
}
export interface IHistoryData{
    '任务代号':ItaskCode,
    '参数名称':IparamName,
    '参数值':IparamValue,
    '测量时间':ImeasureTime
}
export class HisDataContextProvider extends React.PureComponent<any,IHisDataContextState>{
    flag=false;
    constructor(props) {
        super(props);
        const paramMap:IparamMap=new Map();
        this.state = {
            hisData:[],
            paramMap:paramMap
        };
        this.updateHisdata = this.updateHisdata.bind(this);
        this.updateOneHisDataCheckedStatus=this.updateOneHisDataCheckedStatus.bind(this);
        this.updateAllHisDataCheckedStatus=this.updateAllHisDataCheckedStatus.bind(this);
    }
    async updateHisdata(measuretimeFrom,measureTime_to,code,paramName) {
        try{
           const data= await axios({
               method:'post',
               url:'/SSWEB/histData/getHistoryDataList',
               headers:{'X-Requested-With':'XMLHttpRequest',
               'Content-Type':'application/json;charset=UTF-8'
           },
           responseType:'json',
           data:{
               limit:'',
               'measuretime_from':'',
               'measuretime_to':'',
               '任务代号':'',
               '参数名称':'',
               offset:0
           }
       })
            this.setState((prev)=>{
                return produce(prev,(draftState:IHisDataContextState)=>{
                    draftState.hisData=data.data.rows
                })
            });
        }catch(e){
            console.log('error',e);
        }
    }
    updateOneHisDataCheckedStatus(index){
        this.setState((prev)=>{
           return produce(prev,daft=>{
               daft.hisData[index][0]=!daft.hisData[index][0];
           })
        })
    }
    sortCheckedDataByTimeAndType(){
        this.setState((prev)=>{
            return produce(prev,(draftState:IHisDataContextState) => {
                draftState.paramMap=new Map();
                draftState.hisData.map((item)=>{
                   if(draftState.paramMap.has(item.参数名称)){
                       if (draftState.paramMap.get(item.参数名称).has(item.任务代号)){
                           const insertIndex=draftState.paramMap.get(item.参数名称).get(item.任务代号).findIndex((Tupleitem:IChartDataTuple)=>{
                               if(new Date(Tupleitem[0]).getTime()>new Date().getTime()){
                                   return true
                               }
                               return false
                           })
                           const chartDataArray=draftState.paramMap.get(item.参数名称).get(item.任务代号);
                           if (insertIndex>0){
                               const tempArray=chartDataArray.splice(0,insertIndex);
                               draftState.paramMap.get(item.参数名称).set(item.任务代号,[...tempArray,[new Date('item.测量时间'),item.参数值],...chartDataArray])
                           }else if(insertIndex==0){
                               draftState.paramMap.get(item.参数名称).set(item.任务代号,[[new Date('item.测量时间'),item.参数值],...chartDataArray])
                           }else{
                               draftState.paramMap.get(item.参数名称).get(item.任务代号).push([new Date('item.测量时间'),item.参数值])
                           }
                       }else{
                           draftState.paramMap.get(item.参数名称).set(item.任务代号,[[new Date('item.测量时间'),item.参数值]])
                       }
                    }else {
                       let taskcodeMap:ItaskCodeMap=new Map();
                       taskcodeMap.set(item.任务代号,[[new Date('item.测量时间'),item.参数值]])
                       draftState.paramMap.set(item.参数名称,taskcodeMap)
                   }
                })
            })
        })
    }
    updateAllHisDataCheckedStatus(){
        this.flag=!this.flag
        this.setState((prev)=>{
            return produce(prev,(draftState:IHisDataContextState)=>{
                draftState.hisData=draftState.hisData.map((item)=>{
                    item[0]=this.flag;
                    return item;
                })
            })
        })
    }
    render() {
        const contextData = { data: this.state };
        Object.defineProperty(contextData, "updateHisdata", {
            value: this.updateHisdata
        });
        Object.defineProperty(contextData, "updateOneHisDataCheckedStatus", {
            value: this.updateOneHisDataCheckedStatus
        });
        Object.defineProperty(contextData, "updateAllHisDataCheckedStatus", {
            value: this.updateAllHisDataCheckedStatus
        });
        return (  <Provider value={contextData}>
            {this.props.children}
        </Provider>)
    }
}
export const HisDataContextConsumer = (Component)=>{
    return (props)=>{
        return (<Consumer>
            {(context)=>{
                return <Component context={context} {...props} />;
            }}
        </Consumer>  )
    }
}
