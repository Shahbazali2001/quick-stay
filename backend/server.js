// local.js
import app from "./app/index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running locally on http://localhost:${PORT}`);
});
