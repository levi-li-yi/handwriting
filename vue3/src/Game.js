import * as PIXI from 'pixi.js'

// 创建根容器
// 初始化PIXI
const game = new PIXI.Application({
    width: 750,
    height: 1080
})
// 将game.view(pixi实例)添加到dom树里
document.body.appendChild(game.view);

export function getCanvasRootContainer() {
    return game.stage;
}