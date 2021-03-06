import fetchWasm from './utils.js';

var instanceExports;
var offset;
fetchWasm('./wasm/algorithm.wasm', {}).then(instance => {
    instanceExports = instance.exports;
    offset = instanceExports.getArrayOffset();
});

function setArrayBuffer(arr) {
    console.log(arr)
    let mem = new Uint32Array(instanceExports.memory.buffer, offset, arr.length);
    for (let i = 0; i < arr.length; i++) {
        mem[i] = arr[i];
    }
    return mem;
}

function sort({ sortName, arr, flag }) {
    let mem = setArrayBuffer(arr);
    instanceExports[sortName](arr.length, flag);
    return mem;
}

function bubbleSort(arr, flag) {
    let _arr = [];
    flag = flag || 0;
    for (let o of sort({ sortName: "bubbleSort", arr, flag })) {
        _arr.push(o);
    };
    return _arr;
}

export { bubbleSort }
