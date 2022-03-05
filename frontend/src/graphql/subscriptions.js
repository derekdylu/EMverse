import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION = gql`
    subscription PostSubscription ($emotion: String!)
    {
        postSubscription(emotion: $emotion)
        {
            mutation,
            post 
            {
                created_at,
                emotion,
                text,
                is_visible,
            },
        },
    },
`;