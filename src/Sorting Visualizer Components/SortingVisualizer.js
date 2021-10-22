import React, { Component } from 'react';
import { bubbleSortAnimation } from '../Sorting Algorithms/bubbleSort';
import { insertionSortAnimation } from '../Sorting Algorithms/insertionSort';
import { quicksortAnimation } from '../Sorting Algorithms/quickSort';
import { selectionSortAnimation } from '../Sorting Algorithms/selectionSort';

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            array:[], //array of int
            array_size: 30, 
            speed:10, 
            isVisualSorted: false,
            backgroundColor : {
                default: "green"
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
        const max_value = 600;
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
        console.log("sort");

        let animation = sortAnimationFunction(this.state.array);
        const bars = document.getElementsByClassName("visualizer-elements");
        const createArray = document.querySelector(".create-array");
        const speedSlidder = document.querySelector(".speed-slider");
        const sizeSlidder = document.querySelector(".size-slider");
        createArray.disabled = true;
        speedSlidder.disabled = true;
        sizeSlidder.disabled = true;
        console.log("create array disable", createArray.disabled);
        console.log("animation.length", animation.length);

        let interval = 500/(this.state.speed), it = 0;
        let timeout = interval - 10
        let ob = setInterval(() => {
            if(it >= animation.length){
                clearInterval(ob);
                createArray.disabled = false;
                speedSlidder.disabled = false;
                sizeSlidder.disabled = false;
            }
            else{
                 // console.log(animation[i].id1);
                 const element1 = bars[animation[it].i1];
                 const element2 = bars[animation[it].i2];
 
                if(animation[it].ok){
                    element1.style.backgroundColor = element2.style.backgroundColor= "blue";
                    setTimeout(() => {
                        element1.style.backgroundColor = this.state.backgroundColor.default;
                        element2.style.backgroundColor = this.state.backgroundColor.default;
                    }, timeout);
                }
                else{
                    element1.style.backgroundColor = element2.style.backgroundColor= "red";
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
                    <button className="button sort" onClick={() => {this.showAnimation(bubbleSortAnimation)}}>Bubble Sort</button>
                    <button className="button sort" onClick={() => {this.showAnimation(insertionSortAnimation)}}>Insertion Sort</button>
                    <button className="button sort" onClick={() => {this.showAnimation(selectionSortAnimation)}}>Selection Sort</button>
                    <button className="button sort" onClick={() => {this.showAnimation(quicksortAnimation)}}>QuickSort Sort</button>

                    <button className="button create-array" onClick={this.reset_array} >Reset</button>
                    <level for="speed-slid">Speed</level>
                    <input type="range" min="1" max="40" name="range" defaultValue="10" className="slider speed-slider"  id="speed-slid" onChange={(e) => {this.speedChange(e)}} ref={(input)=> this.myinput = input}></input>
                    <level for="sizeOfArray">Size</level>
                    <input type="range" min="10" max="80" name="range1" defaultValue="30" className="array-size slider size-slider"  id="sizeOfArray" onChange={(e) => {this.arraySizeChange(e)}} ref={(input)=> this.myinput1 = input}></input>
                    {/* no effect of ref ?? */}
                </div>
                <div className="visualizer">
                    {this.create_visualizer_elements()}
                </div>
            </>
         );
    }
}
 
export default SortingVisualizer;
