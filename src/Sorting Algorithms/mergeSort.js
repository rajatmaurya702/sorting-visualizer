export function mergeSortAnimation(array){
    console.log("mergeSortAlgorithm");
    let animation = [];
    let n = array.length;

    mergesort(0, n - 1, array, animation);
    return animation;
}

function mergesort(l, r, array, animation){
    console.log("ms", l, r);
    if(r - l === 0) return;
    let mid = Math.floor((l + r) /2);
    mergesort(l, mid, array, animation);
    mergesort(mid +1, r, array, animation);

    merge(l, mid, r, array, animation);
}


function merge(l, mid, r, array, animation){
    console.log("m", l, mid, r);
    let size = r - l + 1, size1 = mid - l +1, size2 = r - mid;
    if(size <= 1) return;
    let gap = Math.ceil(size /2);

    while(gap > 0){
        for(let i = l; i  + gap<= r; i ++){
            if(array[i] > array[i + gap]){
                [array[i], array[i +gap]] = [array[i + gap], array[i]];
                animation.push({i1: i, i2: i + gap, ok:false});
            }
            else animation.push({i1: i, i2: i + gap, ok:true});
        }
        if(gap <= 1) break;
        gap = Math.ceil(gap /2);
    }
}