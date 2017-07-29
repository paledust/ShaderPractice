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

float Rect(float x1, float x2, float y1, float y2, vec2 st){
  vec2 draw_0 = step(vec2(x1,y1),st);
  vec2 draw_1 = step(vec2(1-x2,1-y2),1-st);
  return draw_0.x * draw_0.y * draw_1.x * draw_1.y;
}

float Round_Rect(vec2 st){
  st = st - vec2(0.5);
  vec2 draw = abs(st);
  float temp = max(draw.x, draw.y);
  float s = smoothstep(.3,.4, temp);
  return s;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  float y = st.x;
  float line = plot(st, y);
  float draw = Round_Rect(st);
  vec3 background = vec3(.5,.5,.5);

	gl_FragColor = vec4(mix(background, vec3(0.,1.,0.), draw), 1.0);
  // gl_FragColor = Round_Rect(st);
}