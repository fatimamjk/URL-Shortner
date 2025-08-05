// components/UrlForm.tsx
import { useState } from "react";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import UrlInput from "./UrlInput";

interface Props {
  onUrlCreated: () => void;
}

const UrlForm: React.FC<Props> = ({ onUrlCreated }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/url", { url });
      setUrl("");
      setError(null);
      onUrlCreated();
    } catch (err) {
      setError("Failed to shorten URL");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <UrlInput url={url} onChange={(e) => setUrl(e.target.value)} />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </motion.form>
  );
};

export default UrlForm;
