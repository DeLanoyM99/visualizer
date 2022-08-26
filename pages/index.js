import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React from "react";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/Index.module.css";
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
} from "../sortinghelp/sorting";

const ANIMATION_SPEED_MS = 1;

const NUMBER_OF_ARRAY_BARS = 469;

const PRIMARY_COLOR = "#18453b";

const SECONDARY_COLOR = "#ff0000";

export default class Sorter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 469; i++) {
      array.push(randomIntFromInterval(5, 895));
    }
    this.setState({ array });
  }

  mergeSort() {
    //https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/SortingVisualizer/SortingVisualizer.jsx
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName(styles.arraybar);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    //https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/SortingVisualizer/SortingVisualizer.jsx
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName(styles.arraybar);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        console.log(barOneIdx);
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <Container>
          <Nav fill className="justify-content-center py-3" id={styles.navbar}>
            <Nav.Item>
              <Button variant="dark" onClick={() => this.resetArray()}>
                Generate New Array
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="dark" onClick={() => this.mergeSort()}>
                Merge Sort
              </Button>
            </Nav.Item>
          </Nav>
        </Container>
        <Container fluid className="py-1">
          {array.map((value, idx) => (
            <div
              className={styles.arraybar}
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </Container>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
