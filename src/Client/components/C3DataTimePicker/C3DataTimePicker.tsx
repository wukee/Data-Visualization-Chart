/**
 *
 * C3DataTimePicker.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/2
 *
 * @内容 作用
 * @内容 作用
 */
'use strict';
import * as React from 'react';
import {PureComponent} from 'react';
import {DatePicker} from 'antd'
import './C3DataTimePicker.scss'
const {RangePicker} = DatePicker
interface orderProps {
  onchange:(datastrings:Array<string>)=>any
}

class C3DataTimePickerComponent extends PureComponent <orderProps, any> {
    render() {
        return (
            <RangePicker size={"small"} onChange={(dates, dateStrings)=>{
                this.props.onchange(dateStrings);
            }}>
            </RangePicker>
        )
    }
}

export default (C3DataTimePickerComponent)
