import client from '@/graphql/client'
import { GET_PAGES, GET_PAGE_BY_SLUG } from '@/graphql/queries'
import PageTemplate, { PageTemplateProps } from '@/templates/Pages'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  // retornar um loading ou qualquer outra coisa enquanto a página está sendo criada
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

export const getStaticPaths = async () => {
  const { pages } = await client.request(GET_PAGES, { first: 3 })

  console.log(pages, 'sou eu')

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }

  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}
