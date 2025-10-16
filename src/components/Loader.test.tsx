import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Loader from '../components/Loader'

describe('Loader Component', () => {
  it('renders loading spinner container', () => {
    const { container } = render(<Loader />)
    
    expect(container.firstChild).toBeInTheDocument()
  })

  it('contains spinning animation element', () => {
    const { container } = render(<Loader />)
    
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('rounded-full', 'border-b-2', 'border-blue-600')
  })
})
