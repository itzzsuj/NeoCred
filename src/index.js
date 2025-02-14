import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import supabase from "./supabase/supabase"; // ✅ Import Supabase

window.supabase = supabase;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>
);
