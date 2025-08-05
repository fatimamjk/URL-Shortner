import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./components/themeContext";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-center text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              🔗 URL Shortener
            </motion.h1>
            <ThemeToggle />
          </div>
          <UrlForm onUrlCreated={() => setRefresh(!refresh)} />
          <UrlList key={refresh ? "1" : "0"} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
