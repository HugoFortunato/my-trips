import { render, screen } from '@testing-library/react'

import Map from '.'

describe('<Map />', () => {
  // it('should render without any marker', () => {
  //   render(<Map />)

  //   expect(
  //     screen.getByRole('link', {
  //       name: /a js library for interactive maps/i
  //     })
  //   ).toBeInTheDocument()

  //   // screen.logTestingPlaygroundURL()
  // })

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
