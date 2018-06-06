/**
 *
 * ChartContainer.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/4
 *
 * @内容 作用
 * @内容 作用
 */


'use strict';
import * as React from 'react';
import {PureComponent} from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import '../../assets/lib/chalk.js'
import './ChartContainer.scss'
import {HisdataContext, IHisDataContext, IHisDataContextState} from "../../Context/HistoryDataContext";

interface orderProps {

}

class ChartContainerComponent extends PureComponent <orderProps, any> {

    render() {
        const optionforLine ={
            backgroundColor:'rgba(12,89,177,0.2)',
            title:{
                show:true,
                text:'23',
                left:'center',
                textStyle:{
                    color:'rgb(0,255,255)',
                    fontSize:22
                }
            },
            tooltip:{
                show:true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#ccc',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            textStyle: {
                                color: '#222'
                            }
                        }
                    }
            },
            legend:{
                show:true,
                right: 10,
                top: 20,
                bottom: '20%',
                orient:'vertical',
                type:'scroll'
            },
            grid:{
                // right:'22%'
                containLabel:true
            },
            xAxis: {
                name:'测量时间',
                type: 'time',
                nameTextStyle:{
                    color:'rgb(244,175,84)'
                }
            },
            yAxis: {
                name:'参数值',
                nameTextStyle:{
                    color:'rgb(244,175,84)'
                },
                type: 'value',
                boundaryGap:['10%','10%']
            },dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    top:'92%',
                    bottom:'5%',
                    textStyle:{
                        color:'rgb(0,255,255)'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],

                }
            ],
            series: [{
                name:'15-192',
                showSymbol:true,
                data: [[new Date('2018-4-4'),820],
                       [new Date('2018-4-5'),820],
                       [new Date('2018-4-6'),820],
                       [new Date('2018-4-7'),820],
                       [new Date('2018-4-8'),820],
                       [new Date('2018-4-9'),820],
                       [new Date('2018-4-10'),820],
                       [new Date('2018-4-11'),820]],
                type: 'line'
            }]
        }
        return <HisdataContext.Consumer>
                {
                    (context:IHisDataContext)=>{
                        const data:IHisDataContextState = context.data;
                        const ChartItem = data.paramMap.forEach((value, key)=>{

                        })
                       return ( <div className='ChartContainer'>

                            <div className="ChartItem">
                                <ReactEcharts
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        width: '100%',
                                        height:'100%'
                                    }}
                                    option={optionforLine}
                                    theme={'chalk'}
                                ></ReactEcharts>
                            </div>
                            <div className="ChartItem">
                                <ReactEcharts
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        width: '100%',
                                        height:'100%'
                                    }}
                                    option={optionforLine}
                                    theme={'chalk'}
                                ></ReactEcharts>
                            </div><div className="ChartItem">
                           <ReactEcharts
                               style={{
                                   position: 'absolute',
                                   top: 0,
                                   width: '100%',
                                   height:'100%'
                               }}
                               option={optionforLine}
                               theme={'chalk'}
                           ></ReactEcharts>
                       </div>
                           <div className="ChartItem">
                               <ReactEcharts
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       width: '100%',
                                       height:'100%'
                                   }}
                                   option={optionforLine}
                                   theme={'chalk'}
                               ></ReactEcharts>
                           </div>
                        </div>)
                    }
                }
            </HisdataContext.Consumer>

    }
}

export default (ChartContainerComponent)
