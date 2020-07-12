import { createApp } from './src/runtime-canvas';
import App from './src/App.js'
import {getCanvasRootContainer} from './src/Game'
// console.log(PIXI)

// mount,createApp是基于canvas创建的渲染器
createApp(App).mount(getCanvasRootContainer());

// console.log(game);