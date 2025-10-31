import React, { Component } from "react";

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  setRating = (value) => {
    this.setState({ rating: value });
  };

  renderStars() {
    const { rating } = this.state;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => this.setRating(i)}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            marginRight: "5px",
            color: i <= rating ? "gold" : "lightgray"
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <strong>Rate this book:</strong>
        <div>{this.renderStars()}</div>
        <p>Your rating: {this.state.rating}</p>
      </div>
    );
  }
}

export default Ratings;