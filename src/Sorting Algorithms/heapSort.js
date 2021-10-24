function lchild(i){
    return i * 2 + 1;
}

function rchild(i){
    return lchild(i) + 1;
}

function max_heapify(i, array, size, animation){
    let max_ = i;
    if(lchild(i) < size && array[lchild(i)] > array[max_]){
        max_ = lchild(i);
    }
    if(rchild(i) < size && array[rchild(i)] > array[max_]){
        max_ = rchild(i);
    }

    if(max_ === i) {
        animation.push({i1: max_, i2: i, ok: true});
        return;
    }
    
    [array[max_], array[i]] = [array[i], array[max_]];
    animation.push({i1: max_, i2: i, ok: false});

    max_heapify(max_, array, size, animation);
}

function create_max_heap(array, animation){
    const size = array.length;
    for(let i = Math.floor(size/2) + 1; i >= 0; i --){
        max_heapify(i, array, size, animation);
    }
}

export function heapSortAnimation(array){
    console.log()
    let n = array.length;

    let animation = [];

    let size = n;
    create_max_heap(array, animation);

    for(let i = n - 1; i > 0; i--){
        [array[0], array[size -1]] = [array[size - 1], array[0]];
        animation.push({i1: 0, i2: size - 1, ok: false});
        size --;
        max_heapify(0, array, size, animation);
    }
    return animation;
} 