import client from '@/graphql/client'
import { GetPlaceQuery } from '@/graphql/generated/graphql'
import { GET_PLACES } from '@/graphql/queries'
import HomeTemplate from '@/templates/Home'

import { MapProps } from '@/components/Map'

export default function Home({ places }: MapProps) {
  return <HomeTemplate places={places} />
}

export const getStaticProps = async () => {
  const { places } = await client.request<GetPlaceQuery>(GET_PLACES)

  return {
    props: {
      places
    }
  }
}
