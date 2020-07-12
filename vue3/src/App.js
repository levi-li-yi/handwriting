import {defineComponent, h} from '@vue/runtime-core';

// 使用render函数创建一个App根组件
// defineComponent是vue3的创建组件的
const App = defineComponent({
    render() {
        // 创建虚拟节点sdf
        // <div x="200" y="200">哈哈哈</div>
        // const vnde = h('circle', {x: 200, y: 200}, "哈哈哈");
        const vnde = h('circle', {x: 200, y: 200}, [
            h('circle', {x: 400, y: 400}, '嵌套'),
            "字符串"
        ]);
       console.log(vnde)
        return vnde;
    }
});

export default App;