/**
 *
 * Entrys.config.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2017/3/19
 *
 * @内容 作用
 * @内容 作用
 */
const path = require('path');
const config = require('../config/config');
module.exports.Entrys={
    app:path.resolve(config.appEntry,'index.tsx'),
    'vendor': ['react']
}
