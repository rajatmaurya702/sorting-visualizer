export function selectionSortAnimation(array){
    console.log()
    let n = array.length;

    let animation = [];

    for(let i = 0; i < n; i ++){
        let minIdx = i;
        for(let j = i + 1; j < n; j ++){
            if(array[j] < array[minIdx]){
                minIdx = j;
                animation.push({i1: minIdx, i2: j, ok:true});//just highlight
            }
            else animation.push({i1: minIdx, i2: j, ok:true});// just highlight
        }
        if(minIdx !== i){
            [array[minIdx], array[i]] = [array[i], array[minIdx]];
            animation.push({i1: minIdx, i2: i, ok:false}); //swapping && highlight
        }
        else animation.push({i1: minIdx, i2: i, ok:true}); //no swapping &&  highlight
    }
    return animation;
}