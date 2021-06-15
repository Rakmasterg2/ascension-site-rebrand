import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

import { getBlogPosts } from "../../lib/airtable";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import styled from "styled-components";

const PostWrapper = styled.article`
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  blockquote {
    font-size: 1.5rem;
    border-left: solid 1px;
    border-color: ${({ theme }) => theme.colors.primaryOne};
    padding: 1rem;
    margin: 2rem .5rem;
    p {
      margin: 0;
    }
  }

  #date {
    margin-top: 2rem;
    opacity: 0.8;
    margin-bottom: 0;
  }

  #author-image {
    display: flex;
    align-items: center;
    img {
      border-radius: 100%;
    }
  }

  #back-button {
    display: block;
    margin-bottom: 1rem;
  }

  .author {
    display: flex;
    align-items: center;
    a {
      display: flex;
      align-items: center;
      height: 100%;
      #name {
        margin-left: 5px;
        height: 100%;
        margin-bottom: 0;
      }
    }
    margin-bottom: 1rem;
  }

  .image-container {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Post = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post && post.headline}</title>
      </Head>
      <PostWrapper>
        <Link href='/posts'>
          <a id='back-button'>Back to posts</a>
        </Link>
        <h5 id="date">{post.date}</h5>
        <h1>{post.headline}</h1>
        <div className='author'>
          <Link href={`/team/${post.author.slug}`}>
            <a id='author-link'>
              <div className='' id='author-image'>
                <Image src={post.author.photo} height={40} width={40} />
              </div>
              <div id='name-container'>
                <h4 id='name'>{post.author.name}</h4>
              </div>
            </a>
          </Link>
        </div>
        {post.coverImage !== null && (
          <div className='image-container'>
            <Image
              src={post.coverImage}
              width={1500}
              height={700}
              objectFit='contain'
            />
          </div>
        )}
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </PostWrapper>
    </Layout>
  );
};

export default Post;

export async function getStaticPaths() {
  const posts = await getBlogPosts();
  const paths = posts.map((post) => {
    return {
      params: { post: post.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await getBlogPosts();

  const [post] = posts.filter((p) => p.slug === params.post);
  return { props: { post } };
}
