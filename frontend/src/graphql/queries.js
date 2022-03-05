import { gql } from '@apollo/client';

export const POST_BY_EMOTION = gql`
    query postsByEmotion($emotion: Emotion!)
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
    query Emotions_Count
    {
        emotionsCount
    },
`;