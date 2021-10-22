export function insertionSortAnimation(array){
    console.log()
    let n = array.length;

    let animation = [];

    for(let i = 1; i < n; i ++){
        let j = i;
        while(j > 0 && array[j-1] > array[j]){
            [array[j], array[j-1]] = [array[j-1], array[j]];
            animation.push({i1: j, i2: j-1, ok:false});
            j--;
        }
        if(j > 0)
            animation.push({i1: j, i2: j-1, ok:true});
    }
    return animation;
}