import { vert } from "../../../../../lib/glsl";

export const vertexShader = vert`
  attribute float size;
  varying vec3 vColor;
  uniform float time;
  uniform float width;
  uniform float height;

  varying float vOpacity;
  varying float vWidth;
  varying float vHeight;

  float map(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
  }

  void main() {
    vColor = color;
    vec4 mvPosition = vec4(position, 1.0);

    float inc = mod(time, 2000.0);
    float scatter = 2000.0;
    float speed = 1.0;
    float offset = time * speed;

    float newPosition = mvPosition.z * scatter + offset;

    newPosition = (newPosition - floor(abs(newPosition) / scatter) * scatter);

    if (newPosition > 0.0) {
      newPosition -= scatter;
    }

    mvPosition.z = newPosition;
    
    vOpacity = 1.0 * map(
      clamp(mvPosition.z, -2000.0, -1500.0), -2000.0, -1500.0, 0.0, 1.0
    );

    vWidth = width;
    vHeight = height;
    
    mvPosition.x *= width;
    mvPosition.y *= height;

    if (abs(mvPosition.x) > width) {
      vOpacity = 0.0;
    }

    if (abs(mvPosition.y) > height) {
      vOpacity = 0.0;
    }
    
    mat4 matrix = projectionMatrix;

    //matrix[2][3] = newPosition/10.;
    
    gl_PointSize = size * (1000.0 / -mvPosition.z);
    gl_Position = matrix * mvPosition;
  }
`;
