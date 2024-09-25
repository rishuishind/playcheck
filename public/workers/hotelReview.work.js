self.onmessage = async (event) => {
  try {
    let hotelSlug = event.data.hotelInfo;
    let page = event.data.page;
    let city = event.data.city;
    const response = await fetch("/api/workers/hotelReview", {
      method: "POST",
      body: JSON.stringify({ hotelSlug, page, city }),
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
