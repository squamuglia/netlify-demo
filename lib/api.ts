import {
  GetAllPostsQuery,
  GetAboutPageQuery,
  GetPreviewPostQuery,
  GetAllPostsWithSlugQuery,
  GetPostBySlugQuery,
  GetPostBySlugWithRevisionsQuery,
  GetAllPagesWithSlugQuery,
  GetPageQuery,
  GetProjectsQuery,
} from 'generated/graphql'
import GET_ABOUT_PAGE_QUERY from 'graphql/get-about-page.gql'
import GET_ALL_POSTS_FOR_HOME from 'graphql/get-all-posts-for-home.gql'
import GET_ALL_POSTS_WITH_SLUG from 'graphql/get-all-posts-with-slug.gql'
import GET_PREVIEW_POST from 'graphql/get-preview-post.gql'
import GET_POSTS_BY_SLUG from 'graphql/get-posts-and-more-posts.gql'
import GET_POSTS_BY_SLUG_WITH_REVISION from 'graphql/get-posts-and-more-posts-with-revisions.gql'
import GET_ALL_PAGES_WITH_SLUG from 'graphql/get-all-pages-with-slug.gql'
import GET_PAGE from 'graphql/get-page.gql'
import GET_PROJECTS from 'graphql/get-projects.gql'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

async function fetchAPI(query, { variables = null } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const QUERY = typeof query === 'string' ? query : query?.loc.source.body

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: QUERY,
        variables,
      }),
    })

    const json = await res.json()

    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }

    return json.data
  } catch (err) {
    console.error(err)
  }
}

export async function getAboutPage(): Promise<GetAboutPageQuery> {
  const data = await fetchAPI(GET_ABOUT_PAGE_QUERY)
  return data
}

export async function getPreviewPost(
  id: string | string[],
  idType = 'DATABASE_ID'
): Promise<GetPreviewPostQuery> {
  const data = await fetchAPI(GET_PREVIEW_POST, {
    variables: { id, idType },
  })
  return data
}

export async function getAllPostsWithSlug(): Promise<GetAllPostsWithSlugQuery> {
  const data = await fetchAPI(GET_ALL_POSTS_WITH_SLUG)
  return data
}

export async function getAllPostsForHome(
  preview
): Promise<Pick<GetAllPostsQuery, 'posts'>> {
  const data = await fetchAPI(GET_ALL_POSTS_FOR_HOME, {
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  })

  return data?.posts
}

export async function getPostAndMorePosts(
  slug,
  preview,
  previewData
): Promise<GetPostBySlugQuery | GetPostBySlugWithRevisionsQuery> {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    // Only some of the fields of a revision are considered as there are some inconsistencies
    isRevision ? GET_POSTS_BY_SLUG_WITH_REVISION : GET_POSTS_BY_SLUG,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have a slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}

export async function getAllPagesWithSlug(): Promise<GetAllPagesWithSlugQuery> {
  return fetchAPI(GET_ALL_PAGES_WITH_SLUG)
}

export async function getPage(slug): Promise<GetPageQuery> {
  return fetchAPI(GET_PAGE, { variables: { id: slug } })
}

export async function getProjects(): Promise<GetProjectsQuery> {
  return fetchAPI(GET_PROJECTS)
}
