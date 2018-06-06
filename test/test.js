/**
 *
 * test.js 文件作用
 * @author hurong<353486474@QQ.COM>
 * @date 2018/6/4
 *
 * @内容 作用
 * @内容 作用
 */
let a ={
    value:1
}
const b ={
    prototype:a
}
a={
    value:2
}
console.log(b.prototype.value)
