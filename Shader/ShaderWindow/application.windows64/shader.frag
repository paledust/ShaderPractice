#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void Rect(float x1, float x2, float y1, float y2){
  
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  float y = st.x;
  float line = plot(st, y);
  vec3 background = vec3(.5,.5,.5);

	gl_FragColor = vec4(mix(background, vec3(0.,1.,0.), line), 1.0);
}