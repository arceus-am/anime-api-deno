// src/controllers/popularController.js
export const getPopular = async (req, res) => {
  const data = {
    success: true,
    results: [
      { id: 1, title: "One Piece" },
      { id: 2, title: "My Hero Academia" },
      { id: 3, title: "Chainsaw Man" }
    ]
  };
  res.setHeader && res.setHeader('content-type', 'application/json');
  // response send style depends on framework; try both:
  if (res.send) return res.send(data);
  if (res.json) return res.json(data);
  return res.end(JSON.stringify(data));
};
