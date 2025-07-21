import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNewPostsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNewPostsSubscription = { __typename?: 'Subscription', postAdded: { __typename?: 'Post', id: number, createdAt: string, description: string, images?: Array<{ __typename?: 'ImagePost', url?: string | null }> | null, userBan?: { __typename?: 'UserBan', reason: string } | null, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null } } };


export const GetNewPostsDocument = gql`
    subscription getNewPosts {
  postAdded {
    id
    images {
      url
    }
    createdAt
    description
    userBan {
      reason
    }
    postOwner {
      id
      userName
      avatars {
        url
      }
    }
  }
}
    `;

/**
 * __useGetNewPostsSubscription__
 *
 * To run a query within a React component, call `useGetNewPostsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetNewPostsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewPostsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetNewPostsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetNewPostsSubscription, GetNewPostsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetNewPostsSubscription, GetNewPostsSubscriptionVariables>(GetNewPostsDocument, options);
      }
export type GetNewPostsSubscriptionHookResult = ReturnType<typeof useGetNewPostsSubscription>;
export type GetNewPostsSubscriptionResult = Apollo.SubscriptionResult<GetNewPostsSubscription>;