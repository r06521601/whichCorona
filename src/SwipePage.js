import React, { Component } from 'react'
import { render } from 'react-dom'
import { Card, CardWrapper } from 'react-swipeable-cards';
import coffin_video from './assets/coffin.mp4'
 

class Example extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      openDialog: false,
      failChecker:false,
      missCounter:0
    }
    
}




componentDidMount(){
  var myArray = [
    "corona.png",
    "coronavirus.png",
  ];
  var tempData = []
  for (var i = 0; i < 50; i++) {
    tempData.push(myArray[Math.floor(Math.random()*myArray.length)])
    if(i == 49){
      this.setState({
        data: tempData
      })
    }
  }
}
  onSwipe(data) {
    console.log("I was swiped.");
  }

  onSwipeLeft(data) {
    console.log("I was swiped left.");
    if(data.includes("corona.png")){
      var tempCount = this.state.missCounter +1
      if(tempCount == 5){
        this.setState({
          failChecker:true
        })
      }
      else{
        this.setState({
          missCounter:tempCount
        })
      }

    }
  }

  onSwipeRight(data) {
    console.log("I was swiped right.");
    if(data.includes("coronavirus")){
      this.setState({
        failChecker:true
      })
    }
  }

  onDoubleTap(data) {
    console.log("I was double tapped.");
  }
  
  render() {
    const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));
    


    return(
      this.state.failChecker? <video autoPlay loop src={coffin_video} width={'100%'} /> :
      <CardWrapper

      style={
        {backgroundImage:`url(${images['stare.png']})`,
        backgroundColor: "rgba(255,255,255,"+(1-(this.state.missCounter)/5+0.5)+")",
        backgroundBlendMode: "lighten"

      }
      }
      >
        {this.state.data.map((d) => (
          <Card
            style={
              {backgroundImage:`url(${images[d]})`}
            }
            key={d}
            data={d}
            onSwipe={this.onSwipe.bind(this)}
            onSwipeLeft={this.onSwipeLeft.bind(this)}
            onSwipeRight={this.onSwipeRight.bind(this)}
            onDoubleTap={this.onDoubleTap.bind(this)}>
          </Card>
        ))}
      </CardWrapper>
          
    );
  }
}


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

export default (Example);