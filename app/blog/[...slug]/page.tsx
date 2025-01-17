import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug.join("/");
  const post = posts.find((posts) => posts.slugAsParams === slug);
  return post;
}

// export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
//   const post = await getPostFromParams(params);

//   if (!post) {
//     return {};
//   }

//   const ogSearchParams = new URLSearchPArams();
//   ogSearchParams.set("title", title.post);

//   return {
//     title: post.title,
//     description: post.description,
//   };
// }

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? <p className="text-xl mt-0 text-muted-foreground">{post.description}</p> : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
