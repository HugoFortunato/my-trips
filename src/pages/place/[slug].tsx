import client from '@/graphql/client'
import { GetPlaceBySlugQuery, GetPlaceQuery } from '@/graphql/generated/graphql'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'
import PlacesTemplate, { PlacesTemplateProps } from '@/templates/Places'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function Place({ place }: PlacesTemplateProps) {
  const router = useRouter()

  // retornar um loading ou qualquer outra coisa enquanto a página está sendo criada
  if (router.isFallback) return null

  return <PlacesTemplate place={place} />
}

export const getStaticPaths = async () => {
  const { places } = await client.request<GetPlaceQuery>(GET_PLACES, {
    first: 3
  })

  const paths = places.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) return { notFound: true }

  return {
    props: {
      place
    }
  }
}
