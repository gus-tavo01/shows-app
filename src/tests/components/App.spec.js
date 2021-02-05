import { render, screen } from '@testing-library/react';
import App from '../../App';

test('When renders, expect to find a specific text', () => {
  // Act
  render(<App />);
  const linkElement = screen.getByText(/Shows App/i);
  // Assert
  expect(linkElement).toBeInTheDocument();
});
