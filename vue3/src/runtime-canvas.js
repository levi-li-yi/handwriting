import {createRenderer} from '@vue/runtime-core';
import {Graphics, Text} from 'pixi.js';

// 目标：实现基于canvas的渲染器
// 自定义渲染器
const renderer = createRenderer({
    // 创建渲染接口, 让vue渲染到canvas， App中虚拟节点调用createElement方法
    createElement(type) {
        // 基于type去创建视图
        const element = new Graphics();
        if (type === 'circle') {
            element.beginFill(0xff0000, 1);
            element.drawCircle(0,0,100);
            element.endFill();
        }
        return element;
    },
    // 实现insert接口
    insert(el,parent) {
        // el是createElement创建好的元素Graphics实例
        // parent是父节点
        parent.addChild(el);
        // 将vue3绘制到canvas上面去
    },
    patchProp(el, key, prevValue, nextValue) {
        // key为属性值
        console.log(el, key, prevValue, nextValue);
        el[key] = nextValue;
    },
    setElementText(node,text) {
        // node是createElement创建好的元素Graphics实例
        const canvasText = new Text(text);
        node.addChild(canvasText);
    },
    createText(text) {
        return new Text(text);
    }
});
console.log(renderer);

export function createApp(rootComponent) {
    // createApp返回vue实例
    return renderer.createApp(rootComponent);
}