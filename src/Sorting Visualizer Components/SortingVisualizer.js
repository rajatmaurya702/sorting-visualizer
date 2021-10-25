import React, { Component } from 'react';
import { bubbleSortAnimation } from '../Sorting Algorithms/bubbleSort';
import { heapSortAnimation } from '../Sorting Algorithms/heapSort';
import { insertionSortAnimation } from '../Sorting Algorithms/insertionSort';
import { mergeSortAnimation } from '../Sorting Algorithms/mergeSort';
import { quicksortAnimation } from '../Sorting Algorithms/quickSort';
import { selectionSortAnimation } from '../Sorting Algorithms/selectionSort';

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            array:[], //array of int
            array_size: 30, 
            speed:5, 
            isVisualSorted: false,
            backgroundColor : {
                default: "#778beb",
                rightPosition: "#20bf6b",
                wrongPosition: "#FC427B"
            }
        }
        this.create_array = this.create_array.bind(this);
        // this.sorting_ = this.sorting_.bind(this);
        this.create_visualizer_elements = this.create_visualizer_elements.bind(this);
        this.speedChange = this.speedChange.bind(this);

    }


    reset_array = ()=>{
        this.setState({array: this.create_array()});
    }

    create_array(array_size = this.state.array_size){
        console.log("create_array()");
        let new_array = [];
        const max_value = 550;
        for(let i = 0; i< array_size; i ++){
            const new_value = ((Math.floor((Math.random() * 1000))) % max_value) + 1;
            new_array.push(new_value);
        }
        return new_array;
        // this.setState({array: new_array});
        // this.sorting_();
    }

    componentDidMount(){
        console.log("component did mount ()");
        this.setState({array: this.create_array()});
    }

    create_visualizer_elements (){
        console.log("create_visualizer_elements()")
        console.log(this.state.array);
        return this.state.array.map((element)=>{
            let h = element.toString() + "px";
            return <div style={{height:h}}  className="visualizer-elements"></div>
        })
    }

    showAnimation = (sortAnimationFunction)=>{
        //it takes animation array and manipulate the DOM to show sorting animation
        console.log("sort");

        //getting animation array
        let animation = sortAnimationFunction(this.state.array);

        const bars = document.getElementsByClassName("visualizer-elements");
        const objectsToBlock = document.querySelectorAll(".toBlockWhileAnimation");

        // blocking buttons and slider while animation
        objectsToBlock.forEach(element => {
            element.classList.remove("cursor-pointer");
            element.classList.add("cursor-not-allowed");
            element.disabled = true;

        });

        // console.log("create array disable", createArray.disabled);
        console.log("animation.length", animation.length);

        let interval = 500/(this.state.speed), it = 0;
        let timeout = interval - 10
        let ob = setInterval(() => {
            if(it >= animation.length){
                clearInterval(ob);
                // createArray.disabled = false;
                // speedSlidder.disabled = false;
                // sizeSlidder.disabled = false;

                objectsToBlock.forEach(element => {
                    element.classList.remove("cursor-not-allowed");
                    element.classList.add("cursor-pointer");
                    element.disabled = false;
                });
            }
            else{
                 // console.log(animation[i].id1);
                 const element1 = bars[animation[it].i1];
                 const element2 = bars[animation[it].i2];
 
                if(animation[it].ok){
                    element1.style.backgroundColor = element2.style.backgroundColor= this.state.backgroundColor.rightPosition;
                    setTimeout(() => {
                        element1.style.backgroundColor = this.state.backgroundColor.default;
                        element2.style.backgroundColor = this.state.backgroundColor.default;
                    }, timeout);
                }
                else{
                    element1.style.backgroundColor = element2.style.backgroundColor= this.state.backgroundColor.wrongPosition;
                    setTimeout(() => {
                        element1.style.backgroundColor = this.state.backgroundColor.default;
                        element2.style.backgroundColor = this.state.backgroundColor.default;
                    }, timeout);
                    [element1.style.height, element2.style.height] = [element2.style.height, element1.style.height];
                }
              
                it++;
            }
        }, interval);
      
    }

    speedChange = (e)=>{
        console.log("speedChange()");
        // console.log(e.target);
        this.setState({speed: e.target.value})
    }
    arraySizeChange = (e)=>{
        console.log("arraySizeChange()");

        console.log(e.target.value);
        this.setState({array_size: e.target.value, array: this.create_array(e.target.value)});
    }
  
    render() { 
        console.log(this.state.array );

        return (
            <> 
                <div className="header">
                    <h1>Sorting Visualizer</h1>
                    <div className="buttons-div">
                        <button className="button sort  toBlockWhileAnimation cursor-pointer" onClick={() => {this.showAnimation(bubbleSortAnimation)}}>Bubble Sort</button>
                        <button className="button sort toBlockWhileAnimation cursor-pointer" onClick={() => {this.showAnimation(insertionSortAnimation)}}>Insertion Sort</button>
                        <button className="button sort  toBlockWhileAnimation cursor-pointer" onClick={() => {this.showAnimation(selectionSortAnimation)}}>Selection Sort</button>
                        <button className="button sort toBlockWhileAnimation cursor-pointer" onClick={() => {this.showAnimation(quicksortAnimation)}}>QuickSort Sort</button>
                        <button className="button sort toBlockWhileAnimation cursor-pointer" onClick={() => {this.showAnimation(heapSortAnimation)}}>Heap Sort</button>
                        <button className="button sort toBlockWhileAnimation cursor-pointer" onClick={() => {this.showAnimation(mergeSortAnimation)}}>Merge Sort</button>
                        <button className="button create-array toBlockWhileAnimation cursor-pointer" onClick={this.reset_array} >Reset</button>
                    </div>
                    <div className="sliders">
                        <div className="slider-div">
                            <level for="speed-slid">Speed</level>
                            <input type="range" min="1" max="40" name="range" defaultValue="5" className="slider toBlockWhileAnimation  speed-slider cursor-pointer"  id="speed-slid" onChange={(e) => {this.speedChange(e)}} ref={(input)=> this.myinput = input}></input>
                        </div>
                        <div className="slider-div">
                            <level for="sizeOfArray">Size</level>
                            <input type="range" min="10" max="80" name="range1" defaultValue="20" className="array-size  toBlockWhileAnimation slider size-slider cursor-pointer"  id="sizeOfArray" onChange={(e) => {this.arraySizeChange(e)}} ref={(input)=> this.myinput1 = input}></input>
                        </div>
                        
                        {/* no effect of ref ?? */}
                    </div>
                </div>
                <div className="visualizer">
                    {this.create_visualizer_elements()}
                </div>
            </>
         );
    }
}
 
export default SortingVisualizer;
