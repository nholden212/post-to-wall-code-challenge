import React, { Component } from 'react';

class Wall extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      nameText: "",
      contentText: ""
    };
    this.postsRef = this.props.firebase.database().ref('posts');
  }

  componentDidMount(){
    this.postsRef.on('child_added', snapshot => {
      const post = snapshot.val();
      post.key = snapshot.key;
      var posts = this.state.posts.concat(post);
      this.setState({ posts: posts });
    })
  }

  updateNameText(e){
    this.setState({ nameText: e.target.value });
  }

  updateContentText(e){
    this.setState({ contentText: e.target.value });
  }

  createPost(e){
    e.preventDefault();
    if(!this.state.nameText || !this.state.contentText){ return }
    this.postsRef.push({
      name: this.state.nameText,
      content: this.state.contentText
    });
    this.setState({ nameText: "", contentText: "" });
  }

  render(){

    var posts = (
      this.state.posts.map( (post, index) => {
          return  <div className="post" key={index} onClick={() => this.props.activatePost(post.key, post.name)}>
                    {post.name}
                  </div>
        }));

    return(
      <div className="Wall full">
        <div className="list">
          <h1>Select post:</h1>
          {posts}
        </div>
        <form onSubmit={(e) => this.createPost(e)}>
          <div>
            <h4>New post: </h4>
            <label htmlFor="new-post-name">Name: </label>
            <input
              type="text"
              id="new-post-name"
              value={this.state.nameText}
              onChange={(e) => this.updateNameText(e)}>
            </input>
            <label htmlFor="new-post-content">Content: </label>
            <input
              type="text"
              id="new-post-content"
              value={this.state.contentText}
              onChange={(e) => this.updateContentText(e)}>
            </input>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Wall;
