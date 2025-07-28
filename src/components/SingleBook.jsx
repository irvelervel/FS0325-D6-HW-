import { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
  state = {
    selected: false,
  };

  render() {
    return (
      <>
        <Card
          onClick={() => {
            this.setState({ selected: !this.state.selected });
            // dovremmo cercare al click di questo SingleBook di "trasmettere" il suo ASIN
            // al componente padre BookList, in modo che poi BookList possa passarlo come prop
            // anche al componente CommentArea
            this.props.changeAsin(this.props.book.asin);
          }}
          style={{
            border:
              this.props.selectedAsin === this.props.book.asin
                ? "3px solid red"
                : "none",
          }}
        >
          <Card.Img variant="top" src={this.props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: "black" }}>
              {this.props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
        {/* {this.state.selected && <CommentArea asin={this.props.book.asin} />} */}
      </>
    );
  }
}

export default SingleBook;
