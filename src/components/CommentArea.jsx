import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { Alert } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };

  getComments = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiYWIwMjViMjYxNTAwMTk4YTY5NmEiLCJpYXQiOjE3NTM3MTY4MjMsImV4cCI6MTc1NDkyNjQyM30.ILyYJuxuX4XGkk5LEVM6MtfKcBa_iMlE4BRJVJdv5AA",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero recensioni");
        }
      })
      .then((recensioni) => {
        this.setState({
          comments: recensioni,
          isLoading: false,
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false, isError: true });
      });
  };

  // ora invocheremo getComments() OGNI VOLTA CHE ARRIVA UN NUOVO ASIN
  componentDidUpdate(prevProps) {
    // noi vorremmo eseguire getComments NON ad ogni "update", ma solo quando cambia la prop asin
    if (prevProps.asin !== this.props.asin) {
      this.getComments();
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {this.props.asin ? (
          <>
            <AddComment asin={this.props.asin} />
            <CommentList commentsToShow={this.state.comments} />
          </>
        ) : (
          <Alert variant="info">Seleziona un libro per cominciare</Alert>
        )}
      </div>
    );
  }
}

export default CommentArea;
