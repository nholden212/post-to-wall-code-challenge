import React, { Component } from 'react';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      inputText: ""
    }
    this.commentsRef = this.props.firebase.database().ref('comments');
  }

  componentDidMount() {
    this.commentsRef.on('child_added', snapshot => {
      const item = snapshot.val();
      item.key = snapshot.key;
      var comments = this.state.comments.concat(item);
      this.setState({ comments: comments });
    })
  }

  updateText(e) {
    this.setState({ inputText: e.target.value });
  }

  addComment(e) {
    e.preventDefault();
    if (!this.state.inputText) { return }
    this.commentsRef.push({
      content: this.state.inputText,
      postId: this.props.activePostId
    });
    this.setState({ inputText: "" });
  }

  render(){

    var comments = (
      this.state.comments.map( (comment, index) => {
        if(comment.postId === this.props.activePostId){
            return  <div key={index}>
                      {comment.content}
                    </div>
        }
        return null;
      })
    );

    var form = () => {
      if(this.props.activePost){
        return  <form id="addComment" onSubmit={(e) => this.addComment(e)}>
                  <label htmlFor="comment-input">Add: </label>
                  <input
                    type="text"
                    id="comment-input"
                    value={this.state.inputText}
                    onChange={(e) => this.updateText(e)}></input>
                  <button type="submit">Submit</button>
                </form>
      } else {
        return null;
      }
    }

    return(
      <div className="Post full">
        <h2>{this.props.activePost}</h2>
        <div className="list">
          {comments}
        </div>
          {form()}
      </div>
    )
  }
}

export default Post;
