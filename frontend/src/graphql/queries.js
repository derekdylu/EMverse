import { gql } from '@apollo/client';

export const POST_BY_EMOTION = gql`
    query postsByEmotion($emotion: String!)
    {
        postsByEmotion (emotion: $emotion)
        {
            created_at,
            emotion,
            text,
            is_visible,
        },
    },
`;

export const EMOTIONS_COUNT = gql`
    mutation Emotions_Count ()
    {
        emotionsCount
    },
`;