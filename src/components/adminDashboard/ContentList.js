import React from 'react'
import Avatar from '../Avatar';
import { deletePost } from '../../redux/actions/postAction'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ContentList = ({posts}) => {
      const { auth, socket } = useSelector((state) => state);
        const dispatch = useDispatch();

     const handleDeletePost = (post) => {
        dispatch(deletePost({ post, auth, socket }));
       
     };
    return (
      <div>
        {posts > 0 ? (
          posts.map((post) => (
            <div className="admin_content_display">
              <span className="spam_report">
                Reports: {post.reports.length}
              </span>

              <div className="d-flex">
                <Avatar size="big-avatar" src={post.user.avatar} />
                <div className="d-flex flex-column ms-3">
                  <span className="spam_username">{post.user.username}</span>
                  <span className="spam_email">{post.user.email}</span>
                </div>
                <span className="spam_time text-muted">
                  ~{moment(post.createdAt).fromNow()}
                </span>
              </div>
              <div
                className="ms-auto d-flex flex-column "
                style={{ cursor: "pointer" }}
                onClick={() => handleDeletePost(post)}
              >
                <span className="material-icons">delete</span>Remove
              </div>
            </div>
          ))
        ) : (
          <h1>Nothing to display</h1>
        )}
      </div>
    );
}

export default ContentList
