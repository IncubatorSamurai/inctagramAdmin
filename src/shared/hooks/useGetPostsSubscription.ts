import { useEffect, useState } from 'react'
import { useGetAllPostsLazyQuery } from '../graphql/getPosts.generated'
import { useGetNewPostsSubscription } from '../graphql/subscriptionPosts.generated'
import { ImageModel, Post } from '../api/post/postApi.types'
import { useSearch } from './useSearch'
import { useDebounce } from './useDebounce'
import { useInView } from 'react-intersection-observer'

export const useNormalizedPosts = () => {
  const [lastPostIdForNewPosts, setLastPostIdForNewPosts] = useState(0);
  const { searchTerm, setSearchTerm } = useSearch();
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  
  const [fetchPosts, { data, loading, error }] = useGetAllPostsLazyQuery();
  
  const { data: subscriptionData } = useGetNewPostsSubscription({
    skip: !!debouncedSearchTerm,
  });

  const postsFromServer = data?.getPosts.items ?? [];
  const normalizePost = (item: any): Post => {
    if (!item || !item.id) {
      console.warn('Invalid post item:', item)
      return {
        id: 0,
        userName: '',
        description: '',
        location: '',
        images: [],
        createdAt: '',
        updatedAt: '',
        ownerId: 0,
        avatarOwner: '',
        owner: {
          id: 0,
          firstName: '',
          avatarUrl: '',
        },
        likesCount: 0,
        isLiked: false,
        avatarWhoLikes: false,
      }
    }

    return {
      id: item.id,
      userName: item.postOwner?.userName ?? '',
      description: item.description,
      location: '',
      images:
        item.images?.map((img: ImageModel) => ({
          url: img.url ?? '',
          width: 0,
          height: 0,
          fileSize: 0,
          createdAt: '',
          uploadId: '',
        })) ?? [],
      createdAt: item.createdAt,
      updatedAt: '',
      ownerId: item.id,
      avatarOwner: item.postOwner?.avatars?.[0]?.url ?? '',
      owner: {
        id: item.postOwner?.id,
        firstName: item.postOwner?.userName ?? '',
        avatarUrl: item.postOwner?.avatars?.[0]?.url ?? '',
      },
      likesCount: 0,
      isLiked: false,
      avatarWhoLikes: false,
    }
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [subscribedPosts, setSubscribedPosts] = useState<Post[]>([]); 
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { ref: lastPostRef, inView } = useInView({ threshold: 0 });


  useEffect(() => {
    setPosts([]);
    setLastPostIdForNewPosts(0);
    fetchPosts({
      variables: {
        endCursorPostId: 0,
        searchTerm: debouncedSearchTerm,
      },
    });
  }, [debouncedSearchTerm]);


  useEffect(() => {
    if (postsFromServer.length) {
      const normalized = postsFromServer.map(normalizePost);
      setPosts(prev => isInitialLoad ? normalized : [...prev, ...normalized]);
      setIsInitialLoad(false);
    }
  }, [postsFromServer]);


  useEffect(() => {
    const newPost = subscriptionData?.postAdded;
    if (newPost) {
      const normalizedNewPost = normalizePost(newPost);
      setSubscribedPosts(prev => [normalizedNewPost, ...prev]);
    }
  }, [subscriptionData]);


  useEffect(() => {
    if (inView && !loading && lastPostIdForNewPosts !== 0 && posts.length > 0) {
      fetchPosts({
        variables: {
          endCursorPostId: lastPostIdForNewPosts,
          searchTerm: debouncedSearchTerm,
        },
      });
    }
  }, [inView, loading, lastPostIdForNewPosts]);


  useEffect(() => {
    if (posts.length) {
      setLastPostIdForNewPosts(posts[posts.length - 1].id);
    }
  }, [posts]);


  const displayedPosts = debouncedSearchTerm 
    ? posts 
    : [...subscribedPosts, ...posts];

  const uniquePosts = Array.from(
    new Map(displayedPosts.map(post => [post.id, post])).values()
  );

  return { 
    posts: Array.from(uniquePosts), 
    loading, 
    error, 
    setSearchTerm, 
    searchTerm, 
    lastPostRef,
  };
};