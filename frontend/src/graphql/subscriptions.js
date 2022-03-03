import { gql } from '@apollo/client';

export const POSTSUBSCRIPTION = gql`
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