import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($emotion: Emotion!, $text: String!) {
    createPost(emotion: $emotion, text: $text) {
      created_at
      emotion
      text
      is_visible
    }
  }
`;
