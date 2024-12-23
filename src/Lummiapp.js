import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lummiapp.css"; // Import the new CSS file

const LummiApp = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const LUMMI_API_KEY = "lummi-f4df9e0d125c154c3e6cdea1e5009a3ee221e9c8ea73e1f34a39fb2fe1df5351"; // Replace with your actual Lummi API key
  const LUMMI_BASE_URL = "https://api.lummi.ai/v1/images/search/random"; // Updated API URL

  // Function to fetch multiple random images
  const fetchRandomImages = async (query = "super car", count = 20) => {
    setLoading(true); // Set loading to true
    try {
      const imagePromises = Array.from({ length: count }, () =>
        axios.get(LUMMI_BASE_URL, {
          headers: {
            Authorization: `Bearer ${LUMMI_API_KEY}`,
          },
          params: {
            query: query, // Use the provided query
          },
        })
      );

      const responses = await Promise.all(imagePromises);
      const images = responses.map((response, index) => {
        console.log(`Response ${index + 1}:`, response.data); // Log the entire response for debugging
        return {
          url: response.data[0]?.url || "", // Adjust based on the actual response structure
        };
      });

      console.log("Images found:", images); // Log the array of image objects
      setImages(images); // Update the state with the fetched images
    } catch (error) {
      console.error("Error fetching random images:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch random images on initial load
  useEffect(() => {
    fetchRandomImages("nature", 20); // Preload 10 nature images
  }, []);

  // Function to search for images based on user query
  const handleSearch = async () => {
    setLoading(true); // Set loading to true
    try {
      const imagePromises = Array.from({ length: 20 }, () =>
        axios.get(LUMMI_BASE_URL, {
          headers: {
            Authorization: `Bearer ${LUMMI_API_KEY}`,
          },
          params: {
            query: searchQuery, // Use the search query from the input
          },
        })
      );

      const responses = await Promise.all(imagePromises);
      const images = responses.map((response, index) => {
        console.log(`Search Response ${index + 1}:`, response.data); // Log the entire response for debugging
        return {
          url: response.data[0]?.url || "", // Adjust based on the actual response structure
        };
      });

      console.log("Images found:", images); // Log the array of image objects
      setImages(images); // Update the state with the fetched images
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to download an image
  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;

    // Set a custom filename
    const defaultFileName = "downloaded-image";
    const fileName = url.split("/").pop() || `${defaultFileName}.jpg`;

    link.download = fileName; // Use the extracted filename or default
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Display feedback
    alert("Download started for " + fileName);
  };

  return (
    <div className="lummi-container">
      {/* Logo container */}
      <div className="logo-container">
        <img
          src="https://www.lummi.ai/apple-icon.png?ecde11f55b11e587/64"
          alt="Lummi Logo"
        />
      </div>

      {/* Search input and buttons */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => fetchRandomImages()}>Fetch Random Images</button>
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading images, please wait...</p>}

      {/* Image display */}
      <div className="image-container">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image.url} // Display the image using the URL
                alt="Fetched"
                className="image"
              />
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
