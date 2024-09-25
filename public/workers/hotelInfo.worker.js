self.onmessage = async (event) => {
  try {
    // logic to get data asyncronously with and api
    const response = await fetch("/api/workers/hotelInfo", {
      method: "POST",
      body: JSON.stringify(event.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    self.postMessage(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    self.postMessage({
      error: "Failed to fetch data",
    });
  }
};
