/**
 *
 * Header.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/2
 *
 * @内容 作用
 * @内容 作用
 */
'use strict';
import * as React from 'react';
import {PureComponent} from 'react';
import './Header.scss'
interface orderProps {

}

class HeaderComponent extends PureComponent <orderProps, any> {
    componentDidCatch(error,errInfo){

    }
    render() {
        return (
            <div className="tab_panel">
                <div className="tab_btn">历史数据</div>
                <div className="tab_btn">故障数据</div>
                <div className="tab_btn">文档资料</div>
            </div>
        )
    }
}

export default (HeaderComponent)
