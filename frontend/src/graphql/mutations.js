import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation Create_Post ($emotion: Emotion!, $text: String!)
    {
        createPost(emotion: $emotion, text: $text)
        {
            created_at,
            emotion,
            text,
            is_visible,
        },
    },
`;

export const UPDATE_POST = gql`
    mutation Update_Post ($id: ID!)
    {
        updatePost(id: $id)
        {
            id,
        },
    },
`;