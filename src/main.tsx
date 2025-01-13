import { createRoot } from 'react-dom/client';
import RootApp from './App';
import React from 'react';
import './global.css'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RootApp />);