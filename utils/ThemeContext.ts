import { createContext } from 'react';
interface ContextValueType {
  theme: string;
  toggleTheme: any;
}

const ThemeContext = createContext<ContextValueType>({
  theme: '',
  toggleTheme: () => null,
});

export default ThemeContext;
