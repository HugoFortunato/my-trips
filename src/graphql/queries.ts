// import { gql } from 'graphql-request'

// Caso haja necessidade de pegar os dados de qlq dessas queries, voce pode usar o useQuery no seu componente
import { gql } from '@apollo/client'

export const GET_PAGES = gql`
  query getPages($first: Int) {
    pages(first: $first) {
      id
      heading
      slug
      body {
        html
      }
    }
  }
`

export const GET_PAGE_BY_SLUG = gql`
  query getPageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      id
      slug
      heading
      body {
        html
      }
    }
  }
`
