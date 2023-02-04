import { render, screen, fireEvent } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom/extend-expect'

import Map from '.'

jest.mock('next/router', () => require('next-router-mock'))

const ExampleComponent = ({ href = '/initial-path' }) => {
  const router = useRouter()
  return (
    <button onClick={() => router.push(href)}>
      The current route is: `${href}`
    </button>
  )
}

describe('<Map />', () => {
  it('mocks the useRouter hook', () => {
    // Set the initial url:
    mockRouter.push('/initial-path')

    // Render the component:
    render(<ExampleComponent href="/foo?bar=baz" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    // Click the button:
    fireEvent.click(screen.getByRole('button'))

    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: '/foo?bar=baz',
      pathname: '/foo',
      query: { bar: 'baz' }
    })
  })

  it('should render with the marker in correct place', () => {
    const place = {
      id: '1',
      name: 'Petrópolis',
      slug: 'petropolis',
      location: {
        latitude: 0,
        longitude: 0
      }
    }

    const placeTwo = {
      id: '2',
      name: 'Lisboa',
      slug: 'lisboa',
      location: {
        latitude: 188,
        longitude: -60
      }
    }

    render(<Map places={[place, placeTwo]} />)

    expect(screen.getByTitle(/petrópolis/i)).toBeInTheDocument()
    expect(screen.getByTitle(/lisboa/i)).toBeInTheDocument()
  })
})
