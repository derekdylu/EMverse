import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./Components/LottiePlayer', () => ({ default: () => null }));
vi.mock('./Components/P5Sketch', () => ({ default: () => null }));

test('renders the fallback route for an unknown path', () => {
  window.history.pushState({}, '', '/not/a/route');
  render(<App />);
  expect(screen.getByText('Error')).toBeInTheDocument();
});
