import {useEffect, useState} from 'react';
import {Comment, Like, MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
import {fetchData, makeQuery} from '../lib/utils';
import {Credentials, GraphQLResponse} from '../types/LocalTypes';
import {LoginResponse, MediaResponse, MessageResponse, UploadResponse, UserResponse} from '../types/MessageTypes';
import { useUpdateContext } from './contexHooks';

const useBook = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const {update} = useUpdateContext();

  const getBook = async () => {
    try {
      const query = `
      query MediaItems {
        mediaItems {
          media_id
          user_id
          owner {
            username
            user_id
          }
          filename
          thumbnail
          filesize
          media_type
          title
          description
          created_at
          comments_count
          average_rating
        }
      }
    `;

        const result =
            await makeQuery<GraphQLResponse<{mediaItems: MediaItemWithOwner[]}>, undefined>(
                query,
            );
        setMediaArray(result.data.mediaItems);
    } catch (error) {
      console.error('Error fetching book data', error);
    }
  };

  useEffect(() => {
    getBook();
  }, [update]);

  const postBook = async (file:UploadResponse, inputs: Record<string, string>, token: string) => {
    const book: Omit<MediaItem, 'media_id' | 'user_id' | 'thumbnail' | 'created_at'> = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(book),
    };
return await fetchData<MediaResponse>
(import.meta.env.VITE_MEDIA_API + '/media', options);
  };

  const deleteBook = async (media_id: string, token: string) => {
  const query = `
  mutation DeleteMedia($media_id: ID!) {
    deleteMedia(media_id: $media_id) {
      message
      }
    }`;
const variables = {media_id};
const deleteResult = await makeQuery<GraphQLResponse<{deleteMedia: MessageResponse}>, {media_id: string}>(
  query,
  variables,
  token,
);
return deleteResult.data.deleteMedia;
  }

  return {mediaArray, postBook, deleteBook};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options: RequestInit = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    console.log(token)
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token/',
      options,
    );
  };

  const postUser = async (user: Record<string, string>
  ) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    await fetchData<UserResponse>(import.meta.env.VITE_AUTH_API + '/users/', options,);
  };
  const getUsernameAvailable = async (username: string) => {
    const query = `query CheckUsername($username: String!) {
      checkUsername(username: $username) {
        available
      }
    }`;
    const result = await makeQuery<GraphQLResponse<{checkUsername: {available: boolean}}>, {username: string}>(query, {username});
    return result.data.checkUsername;
  };

  const getEmailAvailable = async (email: string) => {
const query = `query CheckEmail($email: String!) {
  checkEmail(email: $email) {
    available
  }
}`;
const result = await makeQuery<GraphQLResponse<{checkEmail: {available: boolean}}>, {email: string}>(query, {email});
return result.data.checkEmail;
  };

  const getUserById = async (user_id: number) => {
    return await fetchData<User>(
      import.meta.env.VITE_AUTH_API + '/users/' + user_id,
    );
  }


  return {getUserByToken, postUser, getUsernameAvailable, getEmailAvailable, getUserById};
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    const query = `
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        message
        user {
          user_id
          username
          email
          level_name
          created_at
        }
      }
    }
  `;
  const loginResult = await makeQuery<GraphQLResponse<{login: LoginResponse}>, Credentials>(query, creds);
  return loginResult.data.login;
  };

  return {postLogin};
};

const useFile = () => {
  const postFile = async(file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    return await fetchData<UploadResponse>(import.meta.env.VITE_UPLOAD_SERVER +'/upload', options);
  }
  return {postFile};
};

const useLike = () => {
  const postLike = async (media_id: string, token: string) => {
    const query = `
    mutation CreateLike($mediaId: ID!) {
      createLike(media_id: $mediaId) {
        message
      }
    }
  `;
  const variables = {mediaId: media_id};
return await makeQuery<GraphQLResponse<{createLike: MessageResponse}>, {mediaId: string}>(query, variables, token);
  };

  const deleteLike = async (like_id: string, token: string) => {
  const query = `
  mutation DeleteLike($likeId: ID!) {
    deleteLike(like_id: $likeId) {
      message
    }
  }
`;
const variables = {likeId: like_id};
return await makeQuery<GraphQLResponse<{deleteLike: MessageResponse}>, {likeId: string}>(query, variables, token);
  };

  const getCountByMediaId = async (media_id: string) => {
    const query = `
    query MediaItem($mediaId: ID!) {
      mediaItem(media_id: $mediaId) {
        likes_count
      }
    }
  `;
  const variables = {mediaId: media_id};
  const result = await makeQuery<GraphQLResponse<{mediaItem: {likes_count: number}}>, {mediaId: string}>(query, variables);
  console.log(result.data.mediaItem.likes_count)
  return {count: result.data.mediaItem.likes_count}
  };

  const getUserLike = async (media_id: string, token: string) => {
    // Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  return {postLike, deleteLike, getCountByMediaId, getUserLike};
};
const useComment = () => {
  const postComment = async (
     comment_text: string,
     media_id: string,
     token: string) => {
const query = `
mutation CreateComment($mediaId: ID!, $commentText: String!) {
  createComment(media_id: $mediaId, comment_text: $commentText) {
    message
  }
}`;
const variables = {mediaId: media_id, commentText: comment_text};
const result = await makeQuery<GraphQLResponse<{createComment: MessageResponse}>, {mediaId: string, commentText: string}>(query, variables, token);
return result.data.createComment;

  };

  const getCommentsByMediaId = async (media_id: string) => {
 const query = `
 query CommentsByMediaID($mediaId: ID!) {
  commentsByMediaID(media_id: $mediaId) {
    comment_text
    created_at
    user {
      username
    }
  }
}`;
const variables = {mediaId: media_id};
const result = await makeQuery<GraphQLResponse<{commentsByMediaID: Comment[]}>, {mediaId: string}>(query, variables);
console.log(result.data.commentsByMediaID)
return result.data.commentsByMediaID;

  };

  return { postComment, getCommentsByMediaId };
};

export {useBook, useUser, useAuthentication, useFile, useLike, useComment};
