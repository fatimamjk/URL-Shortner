// components/UrlInput.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UrlInputProps {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, onChange }) => {
  return (
    <>
      <div className="relative">
        <Input
          type="url"
          placeholder="Enter your URL"
          required
          className="w-full p-3 border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={url}
          onChange={onChange}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <Button
        type="submit"
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        Shorten URL
      </Button>
    </>
  );
};

export default UrlInput;
