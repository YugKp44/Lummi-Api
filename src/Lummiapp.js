import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lummiapp.css";

const LummiApp = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const LUMMI_API_KEY = "lummi-f4df9e0d125c154c3e6cdea1e5009a3ee221e9c8ea73e1f34a39fb2fe1df5351";
  const LUMMI_BASE_URL = "https://api.lummi.ai/v1/images/search/random";

  const fetchImages = async (query = "nature", count = 10) => {
    setLoading(true);
    setError(null);
    try {
      const imagePromises = Array.from({ length: count }, () =>
        axios.get(LUMMI_BASE_URL, {
          headers: { Authorization: `Bearer ${LUMMI_API_KEY}` },
          params: { query },
        })
      );

      const responses = await Promise.all(imagePromises);
      const images = responses.map((response) => ({
        url: response.data[0]?.url || "",
      }));

      setImages(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchImages(searchQuery, 10);
    }
  };

  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "downloaded-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="lummi-container">
      <div className="logo-container">
        <img
          src="https://www.lummi.ai/apple-icon.png?ecde11f55b11e587/64"
          alt="Lummi Logo"
        />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => fetchImages()}>Fetch Random Images</button>
      </div>

      {loading && <p>Loading images, please wait...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="image-container">
        {images.length > 0 && !loading ? (
          images.map((image, index) => (
            <div key={index} className="image-item">
              <div className="image-placeholder">
                <img
                  src={image.url}
                  alt={`Fetched-${index}`}
                  loading="lazy"
                  className="image"
                  onLoad={(e) => e.target.classList.add("loaded")}
                />
              </div>
              <button onClick={() => downloadImage(image.url)}>Download</button>
            </div>
          ))
        ) : (
          !loading && <p>No images to display. Please search or fetch random images.</p>
        )}
      </div>
    </div>
  );
};

export default LummiApp;
