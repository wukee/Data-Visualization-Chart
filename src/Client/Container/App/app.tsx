/**
 *
 * app.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/3/27
 *
 * @内容 作用
 * @内容 作用
 */

'use strict';
import * as React from 'react';
import {PureComponent} from 'react';
import './app.scss'
import { hot } from 'react-hot-loader'
import Header from '../Header/Header'
import SearchPanel from '../SearchPanel/SearchPanel'
import {HisDataContextProvider} from "../../Context/HistoryDataContext";
import C3SearchTableComponent from '../SearchTable/C3SearchTable'
import ChartContainer from '../SearchCharts/ChartContainer'
interface orderProps {

}

class appComponent extends PureComponent <orderProps, any> {

    render() {
        return (

            <HisDataContextProvider>
            <div className="search_page">
                <div className="search_container">
                    <Header></Header>
                    <SearchPanel></SearchPanel>
                    <C3SearchTableComponent></C3SearchTableComponent>
                    <ChartContainer></ChartContainer>
                </div>
            </div>
            </HisDataContextProvider>
        )
    }
}

export default hot(module)(appComponent)
