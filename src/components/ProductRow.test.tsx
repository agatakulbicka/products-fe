import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductRow from '../components/ProductRow'

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('ProductRow Component', () => {
  const mockProps = {
    id: '123',
    name: 'Test Product',
    number: 'TEST-001'
  }

  it('renders product information correctly', () => {
    render(
      <RouterWrapper>
        <ProductRow {...mockProps} />
      </RouterWrapper>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(/Number:\s*TEST-001/)).toBeInTheDocument()
  })

  it('renders with empty product number', () => {
    const propsWithEmptyNumber = {
      id: '123',
      name: 'Test Product',
      number: ''
    }

    render(
      <RouterWrapper>
        <ProductRow {...propsWithEmptyNumber} />
      </RouterWrapper>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('creates correct link to product details', () => {
    render(
      <RouterWrapper>
        <ProductRow {...mockProps} />
      </RouterWrapper>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/123')
  })

  it('has proper hover styling classes', () => {
    const { container } = render(
      <RouterWrapper>
        <ProductRow {...mockProps} />
      </RouterWrapper>
    )

    const linkElement = container.querySelector('a')
    expect(linkElement).toHaveClass('block', 'hover:bg-gray-50', 'transition-colors')
  })
})
