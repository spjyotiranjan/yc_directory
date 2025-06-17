import {defineQuery} from "groq";

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id,name,image,bio,email
    },
    views,
    category,
    image,
    description,
}`)

export const STARTUP_BY_AUTHOR_QUERY = defineQuery(`*[_type == "startup" &&  author._ref == $id] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id,name,image,bio,email
    },
    views,
    category,
    image,
    description,
}`)


export const STARTUPBY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id,name,image,bio,email,username
    },
    views,
    category,
    image,
    description,
    pitch
}`)

export const STARTUP_VIEW_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{_id,views}`)

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,id,name,username,email,image,bio
    }
    
`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,id,name,username,email,image,bio
    }
    
`)

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`*[_type == "playlist" &&  slug.current == $slug][0]{
    _id,
    title,
    slug,
    select[]->{
         _id,
        title,
        slug,
        _createdAt,
        author ->{
            _id,name,image,bio,email
        },
        views,
        category,
        image,
        description,
    }
}`)