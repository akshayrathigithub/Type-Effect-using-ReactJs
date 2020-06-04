import React, { Component } from "react";
import './App.css'

export default class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      words: ["Good", "Fine", "Fantastic"],
      wait: 3000
    };
  }
  TyperWriter = () =>{
    let txt = "";
    let wordIndex = 0;
    let isDeleting = false;
    this.Type(txt,wordIndex, isDeleting)
  }
  Type = (txt,wordIndex, isDeleting) => {
    const CurrInd = wordIndex % this.state.words.length;
    const fullTxt = this.state.words[CurrInd];
    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }
    let typeSpeed = 300;
    if (isDeleting) {
      typeSpeed = typeSpeed / 2;
    }
    if (!isDeleting && txt === fullTxt) {
      typeSpeed = this.state.wait;
      isDeleting = true;
    } else if (isDeleting && txt === "") {
      isDeleting = false;
      wordIndex++;
      typeSpeed = 500;
    }
    if(this.myRef.current !== null){
    this.myRef.current.innerHTML = `<span id="txt" style={{ borderRight:'0.2rem solid red'}}>${txt}</span>`;
    setTimeout((Txt = txt, WI = wordIndex, Del = isDeleting) => this.Type(Txt, WI, Del), typeSpeed)
    }else
      setTimeout((Txt = txt, WI = wordIndex, Del = isDeleting) => this.Type(Txt, WI, Del), typeSpeed)
  };
  render() {
    return (
      <div>
        <h2>
          Hey there, I hope you are{' '}<span id="txt-type" ref={this.myRef}></span>{" "}
        </h2>
        {this.TyperWriter()}
      </div>
    );
  }
}
