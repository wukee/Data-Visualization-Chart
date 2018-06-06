/**
 *
 * index.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/3/1
 * @flow
 * @内容 作用
 * @内容 作用
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Container/App/app';
import './assets/lib/viewportPollifill'
import './index.scss';

ReactDOM.render(<App />, document.querySelector('.app'))
