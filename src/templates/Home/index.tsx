import { InfoOutline } from '@styled-icons/evaicons-outline'
import dynamic from 'next/dynamic'

import LinkWrapper from '@/components/LinkWrapper'
import { MapProps } from '@/components/Map'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function HomTemplate({ places }: MapProps) {
  return (
    <>
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
