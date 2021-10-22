export function quicksortAnimation(array){
    console.log()
    let n = array.length;

    let animation = [];
    console.log(array);
    quicksort(0, n -1, array, animation);
    console.log(array);
    return animation;
}

function quicksort(l, r, array, animation){
    if(r  - l === 0) return;
    let p = partition(l, r, array, animation);

    if(p-1 > l) quicksort(l, p - 1, array, animation);
    if(r > p +1) quicksort(p + 1, r, array, animation);
}

function partition(l, r, array, animation){
    // 1 2 3 4 5 6 7 8
    let rangeSize = r - l + 1;
    let randIndx = ((Math.floor(Math.random() * 100)) % rangeSize) + l;
    // let randIndx = r;
    [array[randIndx], array[r]] = [array[r], array[randIndx]];
    animation.push({i1: randIndx, i2: r, ok:false});
   
    let i = l;
    for(let j = l; j < r; j ++){
        if(array[j] <= array[r]){
            [array[i], array[j]] = [array[j], array[i]];
            animation.push({i1: i, i2: j, ok:false});
            i++;
        }
        else {
            animation.push({i1: i, i2: j, ok:true});
        }
    }
    if(i !== r){
        [array[i], array[r]] = [array[r], array[i]];
        animation.push({i1: i, i2: r, ok:false});
    }
    
    return i;
}