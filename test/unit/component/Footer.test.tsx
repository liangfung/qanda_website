/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/common/layout/Footer'
import '@testing-library/jest-dom'

describe('Footer component', () => {
  it('renders a footer', () => {
    render(<Footer />)

    const footer = screen.getByText('TabbyML')

    // @ts-ignore
    expect(footer).toBeInTheDocument()
  })
})
