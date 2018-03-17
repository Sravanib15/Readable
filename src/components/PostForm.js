import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { createPost, fetchSelectedPost, modifyPost} from '../actions/postActions'

class PostForm extends Component {

  state = {
    "selectedPost": {},
    "selectedCategory": ""
  }

  guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { selectedPost, status } = this.state;
    selectedPost = selectedPost || this.props.selectedPost;
    const category = this.props.match.params.category || selectedPost.category;

    const values = serializeForm(e.target, { hash: true });
    const { title, body, author} = values;
    selectedPost.title = title;
    selectedPost.body = body;
    selectedPost.author = author;
    selectedPost.category = category;
    console.log(this.state);
    if(status === "new")
      this.props.dispatch(createPost(selectedPost));
    else
      this.props.dispatch(modifyPost(selectedPost));
    this.props.history.push(`/${category}`);
  }

  componentWillMount() {
    console.log(this.props);
    const selectedCategory = this.props.match.params.category;
    const post = this.props.match.params.post;
    if(post) {
      this.props.dispatch(fetchSelectedPost(post));
      const { selectedPost } = this.props;
      this.setState({
        selectedPost,
        selectedCategory,
        "status": "edit"
      })
    } else {
      this.setState({
        "selectedPost": {
          "id": this.guid(),
          "timestamp": Date.now(),
          "body": "",
          "author": "",
          "category": selectedCategory
        },
        selectedCategory,
        "status": "new"
      })
    }
  }

  render() {
    const { selectedCategory, status} = this.state;
    let selectedPost = this.state.selectedPost;
    selectedPost = selectedPost || this.props.selectedPost;
    console.log(status);
    return (
      <div>

          <form onSubmit={this.handleSubmit} className="create-post-form">
            <div className="create-post-details">
              {
                status === 'new' && (
                  <div>
                    <Link to={`/${selectedCategory}`} className='close-arrow-back'> Close </Link>
                    <p>
                      Title:
                      <input type='text' placeholder='Title' name='title'/>
                    </p>
                    <p>
                      Body:
                      <input type='text' placeholder='Body' cols="40" rows="5" name='body'/>
                    </p>
                    <p>
                      Author:
                      <input type='text' placeholder='Author' name='author'/>
                    </p>
                    <button>Add Post</button>
                  </div>
                )
              }

              {
                status === 'edit' && selectedPost && (
                  <div>
                    <Link to={`/${selectedPost.category}`} className='close-arrow-back'> Close </Link>
                    <p>
                      Title:
                      <input type='text' placeholder='Title' name='title' defaultValue={selectedPost.title}/>
                    </p>
                    <p>
                      Body:
                      <input type='text' placeholder='Body' cols="40" rows="5" name='body' defaultValue={selectedPost.body}/>
                    </p>
                    <button>Edit Post</button>
                  </div>
                )
              }

              {
                status === 'edit' && !selectedPost && (
                  <div>
                    Page Not Found - 404
                  </div>
                )
              }
            </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps ({ postReducer }, props) {
  console.log(postReducer);
  const { selectedPost } = postReducer;
  return {
    selectedPost
  }
}

export default withRouter(connect(
  mapStateToProps
)(PostForm))
