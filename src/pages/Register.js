import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Alert, Spinner, InputGroup, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return levels[strength] || "Very Weak";
  };

  const getPasswordStrengthColor = (strength) => {
    const colors = ["danger", "danger", "warning", "info", "success"];
    return colors[strength] || "danger";
  };

  const handlePasswordChange = (password) => {
    setForm({ ...form, password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://backend-w3tr.onrender.com/api/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Registration failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="bg-success bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-person-plus fs-3 text-white"></i>
                  </div>
                  <h2 className="fw-bold text-dark mb-1">Create Account</h2>
                  <p className="text-muted">Join us today and get started</p>
                </div>

                {error && (
                  <Alert variant="danger" className="py-2 mb-3">
                    <small>{error}</small>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-dark">Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-person text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Choose a username"
                        required
                        className="border-start-0 ps-0"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-dark">Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-envelope text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="border-start-0 ps-0"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-dark">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-lock text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        required
                        className="border-start-0 border-end-0 ps-0"
                        value={form.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                      />
                      <InputGroup.Text 
                        className="bg-light border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {form.password && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Password Strength:</small>
                          <small className={`text-${getPasswordStrengthColor(passwordStrength)} fw-semibold`}>
                            {getPasswordStrengthText(passwordStrength)}
                          </small>
                        </div>
                        <div className="progress" style={{ height: '4px' }}>
                          <div 
                            className={`progress-bar bg-${getPasswordStrengthColor(passwordStrength)}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark">Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light border-end-0">
                        <i className="bi bi-shield-check text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        required
                        className="border-start-0 border-end-0 ps-0"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      />
                      <InputGroup.Text 
                        className="bg-light border-start-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        Passwords do not match
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check 
                      type="checkbox" 
                      required
                      label={
                        <span className="small text-muted">
                          I agree to the{' '}
                          <Button variant="link" className="p-0 text-decoration-none small">
                            Terms of Service
                          </Button>
                          {' '}and{' '}
                          <Button variant="link" className="p-0 text-decoration-none small">
                            Privacy Policy
                          </Button>
                        </span>
                      }
                    />
                  </Form.Group>

                  <Button 
                    variant="success" 
                    type="submit" 
                    className="w-100 py-2 fw-semibold rounded-3"
                    disabled={loading || form.password !== form.confirmPassword}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </Button>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none fw-semibold"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </Button>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;