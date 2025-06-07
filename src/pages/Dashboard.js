import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Container, Button } from "react-bootstrap";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const links = [
    { name: "Portfolio Website", url: "https://rrgs-portfolio.vercel.app/" },
    { name: "Blog", url: "https://your-blog-site.com" },
    { name: "Code Storage Hub", url: "https://comret.vercel.app/" },
    { name: "File Manager App", url: "https://filemanager-site.com" },
    // Add more hosted projects here
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios.get("https://backend-w3tr.onrender.com/api/auth/verify", {
      headers: { Authorization: token }
    })
    .then(res => setUser(res.data.user.username))
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <h3>Welcome, {user} 👋</h3>
      <p>Here's a list of your hosted websites:</p>

      <div className="d-flex flex-wrap gap-3 mt-4">
        {links.map((site, index) => (
          <Card key={index} style={{ width: "18rem" }} className="shadow-sm">
            <Card.Body>
              <Card.Title>{site.name}</Card.Title>
              <Button variant="primary" href={site.url} target="_blank">
                Visit Site
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Button variant="danger" className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default Dashboard;
