import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React from "react";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/Index.module.css";

const ANIMATION_SPEED_MS = 1;

const NUMBER_OF_ARRAY_BARS = 469;

const PRIMARY_COLOR = '#18453b';

const SECONDARY_COLOR = '#ff0000';

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
              <Button variant="dark">Merge Sort</Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="dark">Bubble Sort</Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="dark">Quick Sort</Button>
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
