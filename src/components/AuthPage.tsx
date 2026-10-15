import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  onClose?: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onClose, initialMode = 'login' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  useEffect(() => {
    let active = true;
    let renderer: THREE.WebGLRenderer | undefined;
    let geometry: THREE.PlaneGeometry | undefined;
    let material: THREE.ShaderMaterial | undefined;
    let scene: THREE.Scene | undefined;
    let camera: THREE.OrthographicCamera | undefined;
    let animationId: number;

    const initThree = (threeInstance: typeof THREE) => {
      if (!canvasRef.current || !active) return;
      const canvas = canvasRef.current;
      renderer = new threeInstance.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new threeInstance.Scene();
      camera = new threeInstance.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new threeInstance.Vector2(window.innerWidth * 2, window.innerHeight * 2) },
        u_opacities: { value: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0] },
        u_colors: { value: [
          new threeInstance.Vector3(1, 1, 1),
          new threeInstance.Vector3(1, 1, 1),
          new threeInstance.Vector3(1, 1, 1),
          new threeInstance.Vector3(1, 1, 1),
          new threeInstance.Vector3(1, 1, 1),
          new threeInstance.Vector3(1, 1, 1)
        ] },
        u_total_size: { value: 20.0 },
        u_dot_size: { value: 6.0 },
        u_reverse: { value: 0 }
      };

      material = new threeInstance.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main() {
            gl_Position = vec4(position, 1.0);
            fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: `
          precision mediump float;
          in vec2 fragCoord;

          uniform float u_time;
          uniform float u_opacities[10];
          uniform vec3 u_colors[6];
          uniform float u_total_size;
          uniform float u_dot_size;
          uniform vec2 u_resolution;
          uniform int u_reverse;

          out vec4 fragColor;

          float PHI = 1.61803398874989484820459;
          float random(vec2 xy) {
              return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
          }

          void main() {
              vec2 st = fragCoord.xy;
              st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
              st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

              float opacity = step(0.0, st.x) * step(0.0, st.y);

              vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

              float frequency = 5.0;
              float show_offset = random(st2);
              float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
              opacity *= u_opacities[int(rand * 10.0)];
              opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
              opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

              vec3 color = u_colors[int(show_offset * 6.0)];

              float animation_speed_factor = 3.0;
              vec2 center_grid = u_resolution / 2.0 / u_total_size;
              float dist_from_center = distance(center_grid, st2);

              float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

              float current_timing_offset = timing_offset_intro;
              opacity *= step(current_timing_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);

              fragColor = vec4(color, opacity);
              fragColor.rgb *= fragColor.a;
          }
        `,
        uniforms: uniforms,
        glslVersion: threeInstance.GLSL3,
        blending: threeInstance.CustomBlending,
        blendSrc: threeInstance.SrcAlphaFactor,
        blendDst: threeInstance.OneFactor,
        transparent: true
      });

      geometry = new threeInstance.PlaneGeometry(2, 2);
      const mesh = new threeInstance.Mesh(geometry, material);
      scene.add(mesh);

      const startTime = performance.now();
      const animate = () => {
        if (!active) return;
        animationId = requestAnimationFrame(animate);
        uniforms.u_time.value = (performance.now() - startTime) / 1000.0;
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };
      animate();

      const handleResize = () => {
        if (!renderer) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth * 2, window.innerHeight * 2);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    const cleanUp = initThree(THREE);

    return () => {
      active = false;
      if (cleanUp) cleanUp();
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  /* shared button styles */
  const socialBtn: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem",
    borderRadius: 6,
    border: "1px solid #333",
    background: "transparent",
    color: "#fff",
    fontWeight: 500,
    fontSize: "0.875rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "0.4rem",
    transition: "background-color 0.2s ease, border-color 0.2s ease"
  };

  const input: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none"
  };

  /* Google / Facebook / Apple SVGs */
  const GoogleIcon = (
    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const FacebookIcon = (
    <svg viewBox="0 0 24 24" fill="#1877F2" style={{ width: 16, height: 16, flexShrink: 0 }}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const AppleIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0 }}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.88.75 3.65 1.89-3.08 1.75-2.58 5.61.35 6.75-1.01 2.37-2.39 4.39-4.29 4.29zM12.03 7.25c-.15-2.23 1.66-4.07 3.72-4.25.36 2.38-1.92 4.34-3.72 4.25z" />
    </svg>
  );

  const Logo = (
    <div
      style={{
        background: "#111",
        width: 44,
        height: 44,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "1.15rem",
        marginBottom: "0.75rem",
        border: "1px solid #333"
      }}
    >
      TF
    </div>
  );

  const Footer = (
    <div style={{ marginTop: "0.85rem", fontSize: "0.75rem", color: "#666", lineHeight: 1.5, textAlign: "center" }}>
      By proceeding, you agree to creating a Terraform account<br />subject to our{" "}
      <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Terms of Service</a> and{" "}
      <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Privacy Policy</a>.
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000",
        color: "#fff",
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
      }}
    >
      {/* WebGL Dot canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(circle at center,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0) 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Back to Home Button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            background: "rgba(18, 18, 18, 0.8)",
            border: "1px solid #333",
            color: "#eee",
            fontSize: "0.85rem",
            cursor: "pointer",
            backdropFilter: "blur(8px)"
          }}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      )}

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "#121212",
          borderRadius: 12,
          padding: "2rem",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #222",
          maxHeight: "92vh",
          overflowY: "auto"
        }}
      >
        {isLogin ? (
          <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            {Logo}
            <h1 style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.25rem", letterSpacing: "-0.025em" }}>Sign in to Account</h1>
            <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.85rem", lineHeight: 1.5 }}>Sign in to your Account.</p>

            {statusMessage && (
              <div style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#93c5fd", fontSize: "0.8rem", marginBottom: "0.65rem", lineHeight: 1.4 }}>
                {statusMessage}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatusMessage(`Signed in as ${email || 'collector'} successfully.`);
                setTimeout(() => {
                  if (onClose) onClose();
                }, 1200);
              }}
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.65rem" }}
            >
              <input
                style={input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  style={{ ...input, paddingRight: "2.5rem" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", fontSize: "0.75rem", color: "#888" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "#ededed", cursor: "pointer" }} defaultChecked />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setStatusMessage("Password reset link sent to your email.")}
                  style={{ color: "#888", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "0.75rem" }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.65rem",
                  borderRadius: 6,
                  border: "none",
                  background: "#ededed",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  marginTop: "0.25rem"
                }}
              >
                Sign In
              </button>
            </form>

            <div style={{ height: 1, background: "#222", width: "100%", margin: "0.85rem 0" }} />

            <button type="button" onClick={() => setStatusMessage("Continuing with Google...")} style={socialBtn}>{GoogleIcon}Continue with Google</button>
            <button type="button" onClick={() => setStatusMessage("Continuing with Facebook...")} style={socialBtn}>{FacebookIcon}Continue with Facebook</button>
            <button type="button" onClick={() => setStatusMessage("Continuing with Apple...")} style={{ ...socialBtn, marginBottom: 0 }}>{AppleIcon}Continue with Apple</button>

            <div style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "#888" }}>
              Don't have an account?{" "}
              <button
                onClick={() => { setIsLogin(false); setStatusMessage(null); }}
                style={{ color: "#fff", fontWeight: 500, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", textDecoration: "underline" }}
              >
                Sign Up
              </button>
            </div>
            {Footer}
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            {Logo}
            <h1 style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.25rem", letterSpacing: "-0.025em" }}>Sign up for Account</h1>
            <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.85rem", lineHeight: 1.5 }}>Create a new account to get started.</p>

            {statusMessage && (
              <div style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 6, background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#93c5fd", fontSize: "0.8rem", marginBottom: "0.65rem", lineHeight: 1.4 }}>
                {statusMessage}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatusMessage(`Account created for ${email || 'collector'} successfully.`);
                setTimeout(() => {
                  if (onClose) onClose();
                }, 1200);
              }}
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.65rem" }}
            >
              <input
                style={input}
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                style={input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  style={{ ...input, paddingRight: "2.5rem" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.65rem",
                  borderRadius: 6,
                  border: "none",
                  background: "#ededed",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  marginTop: "0.25rem"
                }}
              >
                Sign Up with Email
              </button>
            </form>

            <div style={{ height: 1, background: "#222", width: "100%", margin: "0.85rem 0" }} />

            <button type="button" onClick={() => setStatusMessage("Signing up with Google...")} style={socialBtn}>{GoogleIcon}Sign up with Google</button>
            <button type="button" onClick={() => setStatusMessage("Signing up with Facebook...")} style={socialBtn}>{FacebookIcon}Sign up with Facebook</button>
            <button type="button" onClick={() => setStatusMessage("Signing up with Apple...")} style={{ ...socialBtn, marginBottom: 0 }}>{AppleIcon}Sign up with Apple</button>

            <div style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "#888" }}>
              Already have an account?{" "}
              <button
                onClick={() => { setIsLogin(true); setStatusMessage(null); }}
                style={{ color: "#fff", fontWeight: 500, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", textDecoration: "underline" }}
              >
                Sign In
              </button>
            </div>
            {Footer}
          </div>
        )}
      </div>
    </div>
  );
};
