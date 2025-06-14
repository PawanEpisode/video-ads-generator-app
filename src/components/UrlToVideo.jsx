import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import MarkdownRenderer from "./MarkdownRenderer";

const UrlToVideo = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [videoError, setVideoError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setVideoStatus(null);
    setVideoPath(null);
    setVideoError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/url-to-video/process",
        {
          url,
          generate_video: true,
        }
      );

      setResult(response.data);

      // If video generation was requested, start polling for status
      if (response.data.video_job) {
        pollVideoStatus(response.data.video_job.job_id);
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "An error occurred while processing the URL"
      );
    } finally {
      setLoading(false);
    }
  };

  const pollVideoStatus = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/url-to-video/video-status/${jobId}`
      );
      setVideoStatus(response.data);

      if (response.data.status === "completed") {
        // Get the video path
        const videoResponse = await axios.get(
          `http://localhost:8000/api/v1/url-to-video/video/${jobId}`
        );
        setVideoPath(videoResponse.data.video_path);
      } else if (response.data.status === "failed") {
        setError(response.data.message || "Video generation failed");
      } else if (response.data.status === "processing") {
        // Continue polling
        setTimeout(() => pollVideoStatus(jobId), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Error checking video status");
    }
  };

  const handleVideoError = () => {
    setVideoError("Error loading video. Please try again later.");
  };

  const {
    product_data: { title, description, images = [], price, currency } = {},
    script,
  } = result || {};

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          URL to Video Generator
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color={videoPath ? "success" : "primary"}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading
              ? "Processing..."
              : videoPath
              ? "Regenerate Video"
              : "Generate Video"}
          </Button>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {videoStatus && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              Status: {videoStatus.status}
            </Typography>
            {videoStatus.progress > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <CircularProgress
                  variant="determinate"
                  value={videoStatus.progress}
                  size={20}
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2">
                  Progress: {videoStatus.progress}%
                </Typography>
              </Box>
            )}
            {videoStatus.message && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {videoStatus.message}
              </Typography>
            )}
          </Box>
        )}

        {videoPath && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Video Generated Successfully!
            </Typography>
            {videoError ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {videoError}
              </Alert>
            ) : (
              <div className="flex w-full justify-center items-center rounded-lg ring-inset ring-4 ring-gray-200 p-1">
                <video
                  controls
                  className="w-full h-full max-h-[600px] rounded-lg object-contain"
                  onError={handleVideoError}
                >
                  <source
                    src={`http://localhost:8000/videos/${videoPath
                      .split("/")
                      .pop()}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </Box>
        )}

        {result && (
          <div className="flex flex-col gap-4 py-4">

            {script && (
              <>
                <MarkdownRenderer markdown={script.content} />
              </>
            )}

            {images.length && (
              <Typography
                className="w-fit rounded-md bg-gray-100 p-2"
                variant="body1"
                gutterBottom
              >
                Images: {images.length}
              </Typography>
            )}

            {images && (
              <div className="flex p-4 flex-wrap gap-4 justify-center items-center">
                {images.map((image, index) => (
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    style={{ width: "200px", height: "200px" }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UrlToVideo;
