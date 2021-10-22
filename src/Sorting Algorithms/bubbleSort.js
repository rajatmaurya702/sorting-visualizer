export function bubbleSortAnimation(array){
    console.log("sorting_()");
    let n = array.length;
    // let array = this.state.array; //copying with refrence
    console.log("n", n);
    console.log("array", array);
    let animation = [];
    for(let i = 0; i< n; i++){
        for(let j = 0; j < n - i - 1; j ++){
            // console.log(i, j);
            if(array[j] > array[j + 1]){
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                animation.push({i1: j, i2: j + 1, ok:false});
                // console.log(j, j + 1);
            }
            else{
                animation.push({i1:j, i2: j +1, ok: true});
            }
        }
    }
    console.log(animation);
    return animation;
}