:root {
  --rpd-blue: #003366;
  --rpd-gold: #d4af37;
  --rpd-white: #ffffff;
  --rpd-gray: #f5f5f5;
}

body {
  font-family: "Segoe UI", sans-serif;
  margin: 0;
  background: var(--rpd-gray);
  color: var(--rpd-blue);
}

header {
  background: var(--rpd-blue);
  color: var(--rpd-white);
  padding: 1.5rem;
  text-align: center;
}

h1 {
  margin-bottom: 0.5rem;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2rem;
}

#controls, #results {
  background: var(--rpd-white);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 1.5rem;
  width: 45%;
  min-width: 320px;
}

.slider-group {
  margin-bottom: 1rem;
}

input[type="range"] {
  width: 100%;
}

button {
  background: var(--rpd-gold);
  color: var(--rpd-blue);
  font-weight: bold;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #e0c34a;
}

footer {
  text-align: center;
  padding: 1rem;
  background: var(--rpd-blue);
  color: var(--rpd-white);
}
